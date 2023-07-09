import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Requirement } from "src/requirements/requirements.model";
import { Duty } from "src/duties/duties.model";
import { JobOpeningRequirement } from "./job-openings-requirements.model";

interface IJobOpeningCreationAttr {
    name: string;
    description?: string;
}

@Table({tableName: 'job_openings'})
export class JobOpening extends Model<JobOpening, IJobOpeningCreationAttr> {
    @ApiProperty({example: 1, description: 'Уникальный ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})    
    id: number;

    @ApiProperty({example: 'Инженер-проектировщик (ЭМ,ЭО)', description: 'Название должности'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})  
    name: string;

    @ApiProperty({example: 'Инженер-проектировщик (ЭМ,ЭО) занимается тем то тем то бла бла бла', description: 'Описание вакансии, должности'})
    @Column({type: DataType.STRING})
    description: string;

    @BelongsToMany(() => Requirement, () => JobOpeningRequirement)
    requirements: Requirement[];

    @HasMany(() => Duty, {onDelete: 'cascade', onUpdate: 'cascade'})
    duties: Duty[];
}