import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { YupValidationPipe } from 'nestjs-yup';

import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  getAll() {
    return this.notesService.getAll();
  }

  @Get('stats')
  getStats() {
    return this.notesService.getStats();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.notesService.getById(id);
  }

  @Post()
  create(@Body(YupValidationPipe) createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }

  @Patch(':id')
  update(@Body() updateNoteDto: UpdateNoteDto, @Param('id') id: string) {
    return this.notesService.update(id, updateNoteDto);
  }
}
