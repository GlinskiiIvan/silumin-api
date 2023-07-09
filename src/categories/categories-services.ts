import { Column, DataType, Model, Table, ForeignKey } from "sequelize-typescript";
import { Category } from "./categories.model";
import { Service } from "src/services/services.model";

@Table({tableName: 'categories_services'})
export class CategoryService extends Model<CategoryService> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})    
    id: number;

    @ForeignKey(() => Category)
    @Column({type: DataType.INTEGER})
    category_id: number;

    @ForeignKey(() => Service)
    @Column({type: DataType.INTEGER})
    service_id: number;
}