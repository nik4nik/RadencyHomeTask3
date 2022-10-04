import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize, QueryTypes } from 'sequelize';

import { Note } from './notes.model';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note) private noteRepository: typeof Note) {}

  async getAll() {
    return await this.noteRepository.findAll({ include: { all: true } });
  }

  async getById(id: string) {
    return await this.noteRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async getStats() {
    const sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        dialect: 'postgres',
        host: process.env.DB_HOST,
      },
    );

    sequelize
      .authenticate()
      .then(() => console.log('Connected.'))
      .catch((err) => console.error('Connection error: ', err));

    return await sequelize.query(
		`select 
			category, 
			sum(case when archived then 1 else 0 end) as archived,
			sum(case when archived then 0 else 1 end) as active
		from
			"Notes" 
		group by
			category`,
      {
        raw: true, //если для таблицы не определена модель
        type: QueryTypes.SELECT,
      },
    );
  }

  async create(noteDto: CreateNoteDto) {
    return await this.noteRepository.create(noteDto);
  }

  async remove(id: string) {
    const note = await this.noteRepository
      .findOne({ where: { id } })
      .catch((e) => {
        console.log(e.message);
      });
    if (!note) console.log('Remove error');
    else await note.destroy();
  }

  async update(id: string, noteDto: UpdateNoteDto) {
    try {
      await this.noteRepository.update(noteDto, { where: { id } });
      return await this.noteRepository.findOne({
        where: { id },
        include: { all: true },
      });
    } catch (err) {
      console.log(err);
    }
  }
}
