import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { JobOpening } from "src/job-openings/job-openings.model";
import { JobOpeningRequirement } from "src/job-openings/job-openings-requirements.model";

interface IRequirementCreationAttr {
    value: string;
}
 
@Table({tableName: 'requirements'})
export class Requirement extends Model<Requirement, IRequirementCreationAttr> {
    @ApiProperty({example: 1, description: 'Уникальный ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})    
    id: number;

    @ApiProperty({example: 'Высшее образование', description: 'Значение требования'})
    @Column({type: DataType.STRING, allowNull: false})
    value: string;

    @BelongsToMany(() => JobOpening, () => JobOpeningRequirement)
    job_opening: JobOpening[];
}