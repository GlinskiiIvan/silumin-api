import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Document } from "src/documents/documents.model";

interface IProjectCreationAttr {
    title: string;
    short_desc: string;
    content: string;
    image: string;
}

@Table({tableName: 'projects'})
export class Project extends Model<Project, IProjectCreationAttr> {
    @ApiProperty({example: 1, description: 'Уникальный ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})    
    id: number;

    @ApiProperty({example: '', description: ''})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @ApiProperty({example: '', description: ''})
    @Column({type: DataType.STRING, allowNull: false})
    short_desc: string;

    @ApiProperty({example: '', description: ''})
    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @ApiProperty({example: '', description: ''})
    @Column({type: DataType.STRING, allowNull: false})
    image: string;

    @HasMany(() => Document, {onDelete: 'cascade', onUpdate: 'cascade', foreignKey: 'project_id'})
    documents: Document[]
}