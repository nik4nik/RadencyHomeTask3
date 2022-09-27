import { noteSchema } from './note-schema';
import { UseSchema } from 'nest-yup';

@UseSchema(noteSchema)
export class CreateNoteDto {
  name: string;
  readonly date: Date;
  content: string;
  category: string;
  archived: false;
}
