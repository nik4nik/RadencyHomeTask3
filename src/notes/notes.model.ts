import {Column, DataType, HasOne, Model, Table} from "sequelize-typescript";

@Table({tableName: 'Notes'})
export class Note extends Model<Note> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    content: string;
    @Column({type: DataType.STRING, allowNull: false})
    category: string;
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    archived: boolean;
}