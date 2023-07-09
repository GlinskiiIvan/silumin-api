import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Employee } from "src/employees/employees.model";
import { Document } from "src/documents/documents.model";
import { Equipment } from "src/equipments/equipments.model";
import { Category } from "src/categories/categories.model";
import { CategoryProduct } from "src/categories/categories-products.model";
import { ProductEmployee } from "./products-employees.model";

interface IProductCreationAttr {
    title: string;
    content: string;
    image: string;
}

@Table({tableName: 'products'})
export class Product extends Model<Product, IProductCreationAttr> {
    @ApiProperty({example: 1, description: 'Уникальный ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})    
    id: number;

    @ApiProperty({example: 'Холодильники', description: 'название продукции'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @ApiProperty({example: 'Какой то текст, много текст', description: 'Описпние продукции'})
    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @ApiProperty({example: 'dfsfsf-w-f-df-wfwwfwdfwe.jpg', description: 'Обложка продукции'})
    @Column({type: DataType.STRING, allowNull: false})
    image: string;

    @BelongsToMany(() => Category, () => CategoryProduct)
    categories: Category[];

    @BelongsToMany(() => Employee, () => ProductEmployee)
    employees: Employee[];
    
    @HasMany(() => Document, {onDelete: 'cascade', onUpdate: 'cascade', foreignKey: 'product_id'})
    documents: Document[];

    @HasMany(() => Equipment, {foreignKey: 'equipment_id'})
    equipments: Equipment[];
}