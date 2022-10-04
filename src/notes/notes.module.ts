import {forwardRef, Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";

import {Note} from "./notes.model";
import { NotesService } from './notes.service'
import { NotesController } from './notes.controller'

@Module({
  providers: [NotesService],
  controllers: [NotesController],
  imports: [SequelizeModule.forFeature([
	Note
  ])],
})

export class NotesModule {}