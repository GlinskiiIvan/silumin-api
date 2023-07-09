import { Column, DataType, Model, Table, ForeignKey } from "sequelize-typescript";
import { Product } from "./products.model";
import { Employee } from "src/employees/employees.model";

@Table({tableName: 'products_employees'})
export class ProductEmployee extends Model<ProductEmployee> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})    
    id: number;

    @ForeignKey(() => Product)
    @Column({type: DataType.INTEGER})
    product_id: number;

    @ForeignKey(() => Employee)
    @Column({type: DataType.INTEGER})
    employee_id: number;
}