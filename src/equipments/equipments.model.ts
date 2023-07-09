import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Document } from "src/documents/documents.model";
import { Employee } from "src/employees/employees.model";
import { Product } from "src/products/products.model";
import { Specification } from "src/specifications/specifications.model";
import { EquipmentEmployee } from "./equipments-employees.model";

interface IEquipmentCreationAttr {
    title: string;
    content: string;
    image: string;
}

@Table({tableName: 'equipments'})
export class Equipment extends Model<Equipment, IEquipmentCreationAttr> {
    @ApiProperty({example: 1, description: 'Уникальный ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})    
    id: number;

    @ApiProperty({example: '', description: ''})
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @ApiProperty({example: '', description: ''})
    @Column({type: DataType.STRING, allowNull: false})  
    content: string;

    @ApiProperty({example: '', description: ''})
    @Column({type: DataType.STRING, allowNull: false})  
    image: string;

    @Column({type: DataType.INTEGER})
    @ForeignKey(() => Product)
    product_id: number;

    @HasMany(() => Document, {foreignKey: 'equipment_id'})
    documents: Document[];
    @HasMany(() => Specification, {foreignKey: 'equipment_id'})
    specification: Specification[];
    @BelongsToMany(() => Employee, () => EquipmentEmployee)
    employees: Employee[];
}