import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Licenses } from "src/licenses/licenses.model";

interface ILicensesCategoryCreationAttr {
    name: string;
}

@Table({tableName: 'licenses_category'})
export class LicensesCategory extends Model<LicensesCategory, ILicensesCategoryCreationAttr> {
    @ApiProperty({example: 1, description: 'Уникальный ID категории лицензии'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})    
    id: number;

    @ApiProperty({example: 'Сертификаты', description: 'Название категории'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})  
    name: string;

    // @HasMany(() => Licenses, {onDelete: 'cascade', onUpdate: 'cascade'})
    @HasMany(() => Licenses)
    licenses: Licenses[];
}