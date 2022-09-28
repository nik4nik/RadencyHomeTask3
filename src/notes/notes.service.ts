import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  private notes = [
    {
      id: '1',
      name: 'todo1',
      content: "it's my todo1",
      category: 'Task',
      archived: false,
    },
    {
      id: '2',
      name: 'todo2',
      content: "it's my todo2",
      category: 'Task',
      archived: false,
    },
    {
      id: '3',
      name: 'todo3',
      content: "it's my todo3",
      category: 'Quote',
      archived: false,
    },
    {
      id: '4',
      name: 'todo4',
      content: "it's my todo4",
      category: 'Quote',
      archived: false,
    },
    {
      id: '5',
      name: 'todo5',
      content: "it's my todo5",
      category: 'Random Thought',
      archived: false,
    },
    {
      id: '6',
      name: 'todo6',
      content: "it's my todo6",
      category: 'Random Thought',
      archived: true,
    },
    {
      id: '7',
      name: 'todo7',
      content: "it's my todo7",
      category: 'Idea',
      archived: true,
    },
  ];

  getAll() {
    return this.notes;
  }

  getById(id: string) {
    return this.notes.find((p) => p.id === id);
  }

  getStats() {
    return Array.from(new Set(this.notes.map((note) => note.category))).map(
      (e) => ({
        [e]: this.notes
          .filter((note) => note.category === e)
          .reduce(
            (accum, note) => (
              accum[note.archived ? 'archived' : 'active']++, accum
            ),
            { active: 0, archived: 0 },
          ),
      }),
    );
  }

  create(noteDto: CreateNoteDto) {
    const e = {
      ...noteDto,
      id: Date.now().toString(),
    };
    this.notes.push(e);
    return e;
  }

  remove(id: string) {
    const idx = this.notes.findIndex((p) => p.id === id)
    return idx >= 0? this.notes.splice(idx, 1): null;
  }

  update(id: string, noteDto: UpdateNoteDto) {
    const elt = this.notes.find((p) => p.id === id);
	for (let prop in noteDto)
    	elt[prop] = noteDto[prop]
    return elt;
  }
}
