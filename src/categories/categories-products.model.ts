import { Column, DataType, Model, Table, ForeignKey } from "sequelize-typescript";
import { Category } from "./categories.model";
import { Product } from "src/products/products.model";

@Table({tableName: 'categories_products'})
export class CategoryProduct extends Model<CategoryProduct> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})    
    id: number;

    @ForeignKey(() => Category)
    @Column({type: DataType.INTEGER})
    category_id: number;

    @ForeignKey(() => Product)
    @Column({type: DataType.INTEGER})
    product_id: number;
}