import { Column, DataType, Model, Table, ForeignKey } from "sequelize-typescript";
import { JobOpening } from "./job-openings.model";
import { Requirement } from "src/requirements/requirements.model";

@Table({tableName: 'job_openings_requirements'})
export class JobOpeningRequirement extends Model<JobOpeningRequirement> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})    
    id: number;

    @ForeignKey(() => JobOpening)
    @Column({type: DataType.INTEGER})
    job_opening_id: number;

    @ForeignKey(() => Requirement)
    @Column({type: DataType.INTEGER})
    requirement_id: number;
}