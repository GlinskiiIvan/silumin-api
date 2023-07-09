import { Column, DataType, Model, Table, ForeignKey } from "sequelize-typescript";
import { Service } from "./services.model";
import { Employee } from "src/employees/employees.model";

@Table({tableName: 'services_employees'})
export class ServiceEmployee extends Model<ServiceEmployee> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})    
    id: number;

    @ForeignKey(() => Service)
    @Column({type: DataType.INTEGER})
    service_id: number;

    @ForeignKey(() => Employee)
    @Column({type: DataType.INTEGER})
    employee_id: number;
}