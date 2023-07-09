import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany } from "sequelize";
import { BelongsTo, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Contact } from "src/contacts/contacts.model";

interface IEmployeeCreationAttr {
    last_name: string;
    first_name: string;
    patronymic: string;
    position: string;
}

@Table({tableName: 'employees'})
export class Employee extends Model<Employee, IEmployeeCreationAttr> {
    @ApiProperty({example: 1, description: 'Уникальный ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})    
    id: number;

    @ApiProperty({example: 'Глинский', description: 'Фамалия'})
    @Column({type: DataType.STRING, allowNull: false})
    last_name: string;

    @ApiProperty({example: 'Иван', description: 'Имя'})
    @Column({type: DataType.STRING, allowNull: false})  
    first_name: string;

    @ApiProperty({example: 'Николаевич', description: 'Отчество'})
    @Column({type: DataType.STRING, allowNull: false})  
    patronymic: string;

    @ApiProperty({example: 'Full stack web dev junior', description: 'Должность'})
    @Column({type: DataType.STRING, allowNull: false})  
    position: string;

    @HasMany(() => Contact, {onDelete: 'cascade', onUpdate: 'cascade'})
    contacts: Contact[];
}