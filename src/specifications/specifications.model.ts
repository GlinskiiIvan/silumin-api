import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

interface ISpecificationCreationAttr {
    name: string;
    value: string;
    equipment_id: number;
}

@Table({tableName: 'specifications'})
export class Specification extends Model<Specification, ISpecificationCreationAttr> {
    @ApiProperty({example: 1, description: 'Уникальный ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})    
    id: number;

    @ApiProperty({example: 'Мощность', description: 'Название характеристики'})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example: '600 кВт', description: 'Значение характеристики'})
    @Column({type: DataType.STRING, allowNull: false})  
    value: string;

    @ApiProperty({example: '4', description: 'ИД родителя'})
    // @ForeignKey(() => Equipment)
    @Column({type: DataType.INTEGER, allowNull: false})  
    equipment_id: number;

    // @BelongsTo(() => Equipment, {foreignKey: 'equipment_id'})
    // employees: Equipment;
}