import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Contact } from "src/contacts/contacts.model";

interface IContactBrancheCreationAttr {
    city: string;
    name: string;
    address: string;
}

@Table({tableName: 'contacts-branches'})
export class ContactBranche extends Model<ContactBranche, IContactBrancheCreationAttr> {
    @ApiProperty({example: 1, description: 'Уникальный ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})    
    id: number;

    @ApiProperty({example: 'Усть-Каменогорск', description: 'Город в котором находится филиал'})
    @Column({type: DataType.STRING, allowNull: false})  
    city: string;

    @ApiProperty({example: 'Головной офис', description: 'Название филиала'})
    @Column({type: DataType.STRING, allowNull: false})  
    name: string;

    @ApiProperty({example: 'Республика Казахстан, г.Усть-Каменогорск, ул.Қалихан Ысқақ, 10', description: 'Точный адрес филиала'})
    @Column({type: DataType.STRING, allowNull: false})  
    address: string;

    @HasMany(() => Contact, {onDelete: 'cascade', onUpdate: 'cascade'})
    contacts: Contact[];
}