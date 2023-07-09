import { Column, DataType, Model, Table, ForeignKey } from "sequelize-typescript";
import { Equipment } from "./equipments.model";
import { Employee } from "src/employees/employees.model";

@Table({tableName: 'equipments_employees'})
export class EquipmentEmployee extends Model<EquipmentEmployee> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})    
    id: number;

    @ForeignKey(() => Equipment)
    @Column({type: DataType.INTEGER})
    equipment_id: number;

    @ForeignKey(() => Employee)
    @Column({type: DataType.INTEGER})
    employee_id: number;
}