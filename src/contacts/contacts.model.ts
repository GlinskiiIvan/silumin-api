import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ContactBranche } from "src/contacts-branches/contacts-branches.model";
import { Employee } from "src/employees/employees.model";

interface IContactCreationAttr {
    value: string;
    type: string;
    employee_id?: number;
    contact_branche_id?: number;
}

@Table({tableName: 'contacts'})
export class Contact extends Model<Contact, IContactCreationAttr> {
    @ApiProperty({example: 1, description: 'Уникальный ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})    
    id: number;

    @ApiProperty({example: '+7 (7232) 701 120/ivan_glinskiy@mail.ru/+7 (7232) 700 604', description: 'Номер телефона, факса или email'})
    @Column({type: DataType.STRING, allowNull: false})  
    value: string;

    @ApiProperty({example: 'email', description: 'Тип контакта phone/email/fax...'})
    @Column({type: DataType.STRING, allowNull: false})  
    type: string;

    @ApiProperty({example: '2', description: 'ИД владельца'})
    @ForeignKey(() => Employee)
    @Column({type: DataType.INTEGER})
    employee_id: number;
    
    @ApiProperty({example: '2', description: 'ИД владельца'})
    @ForeignKey(() => ContactBranche)
    @Column({type: DataType.INTEGER})
    contact_branche_id: number;

    @BelongsTo(() => Employee, {onDelete: 'cascade', onUpdate: 'cascade' })
    employee: Employee;
    
    @BelongsTo(() => ContactBranche, {onDelete: 'cascade', onUpdate: 'cascade'})
    contact_branche: ContactBranche;
}