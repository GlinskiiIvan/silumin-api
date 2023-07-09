import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { CategoryProduct } from "./categories-products.model";
import { Product } from "src/products/products.model";
import { Service } from "src/services/services.model";
import { CategoryService } from "./categories-services";

interface ICategoryCreationAttr {
    name: string;
}

@Table({tableName: 'categories'})
export class Category extends Model<Category, ICategoryCreationAttr> {
    @ApiProperty({example: 1, description: 'Уникальный ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})    
    id: number;

    @ApiProperty({example: 'Отборожать на главной', description: 'Название категории'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})  
    name: string;

    @BelongsToMany(() => Product, () => CategoryProduct)
    products: Product[];

    @BelongsToMany(() => Service, () => CategoryService)
    services: Service[];
}