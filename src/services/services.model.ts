import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Employee } from "src/employees/employees.model";
import { Document } from "src/documents/documents.model";
import { Category } from "src/categories/categories.model";
import { CategoryService } from "src/categories/categories-services";
import { ServiceEmployee } from "./services-employees.model";

interface IServiceCreationAttr {
    title: string;
    content: string;
    image: string;
}

@Table({tableName: 'services'})
export class Service extends Model<Service, IServiceCreationAttr> {
    @ApiProperty({example: 1, description: 'Уникальный ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})    
    id: number;

    @ApiProperty({example: '', description: ''})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @ApiProperty({example: '', description: ''})
    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @ApiProperty({example: '', description: ''})
    @Column({type: DataType.STRING, allowNull: false})
    image: string;

    @BelongsToMany(() => Category, () => CategoryService)
    categories: Category[];

    @BelongsToMany(() => Employee, () => ServiceEmployee)
    employees: Employee[];
    
    @HasMany(() => Document, {onDelete: 'cascade', onUpdate: 'cascade', foreignKey: 'service_id'})
    documents: Document[];
}