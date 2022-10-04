import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Note } from "./notes/notes.model";
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
	ConfigModule.forRoot({
		envFilePath: '.env'
	}),
	NotesModule,
	SequelizeModule.forRoot({
		dialect: 'postgres',
		host: 'localhost',
		port: Number(process.env.DB_PORT),
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		models:[Note],
		autoLoadModels: true
	}),
  ],
})
export class AppModule {}