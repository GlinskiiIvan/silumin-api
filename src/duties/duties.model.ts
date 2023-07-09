import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { JobOpening } from "src/job-openings/job-openings.model";

interface IDutyCreationAttr {
    value: string;
    job_opening_id: number;
}

@Table({tableName: 'duties'})
export class Duty extends Model<Duty, IDutyCreationAttr> {
    @ApiProperty({example: 1, description: 'Уникальный ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})    
    id: number;

    @ApiProperty({example: 'Выполнение проектов согласно действующих норм и правил РК', description: 'Обязанность должности'})
    @Column({type: DataType.STRING, allowNull: false})  
    value: string;

    @ApiProperty({example: '2', description: 'ИД вакансии к которой это относится'})
    @ForeignKey(() => JobOpening)
    @Column({type: DataType.INTEGER})
    job_opening_id: number;

    @BelongsTo(() => JobOpening, {onDelete: 'cascade', onUpdate: 'cascade' })
    job_opening: JobOpening;
}