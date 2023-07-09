import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface INewsCreationAttr {
    title: string;
    sub_title: string;
    content: string;
    date: Date;
    image: string;
}

@Table({tableName: 'news'})
export class News extends Model<News, INewsCreationAttr> {
    @ApiProperty({example: 1, description: 'Уникальный ID пользователя'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})    
    id: number;

    @ApiProperty({example: 'Мы посетили выставку...', description: 'Загловок новости'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})  
    title: string;

    @ApiProperty({example: 'Что то там произошло, была движуха уухууу', description: 'Короткое описание новости'})
    @Column({type: DataType.STRING, allowNull: false})
    sub_title: string;

    @ApiProperty({example: 'Очень много текста про какое то событие', description: 'Основное содержание новости'})
    @Column({type: DataType.TEXT, allowNull: false})
    content: string;

    @ApiProperty({example: new Date(2023,5,15), description: 'Дата когда произошло событие'})
    @Column({type: DataType.DATE, allowNull: false})
    date: Date;

    @ApiProperty({example: 'dfh-ue3-847-jfh.webp', description: 'Обложка новости'})
    @Column({type: DataType.STRING, allowNull: false})
    image: string;
}