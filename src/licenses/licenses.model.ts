import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { LicensesCategory } from "src/licenses-category/licenses-category.model";

interface ILicensesCreationAttr {
    licenses_category_id: number
    image: string;
}

@Table({tableName: 'licenses'})
export class Licenses extends Model<Licenses, ILicensesCreationAttr> {
    @ApiProperty({example: 1, description: 'Уникальный ID категории лицензии'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})    
    id: number;

    @ApiProperty({example: 'Сертификаты', description: 'Название категории'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})  
    image: string;

    @ForeignKey(() => LicensesCategory)
    @Column({type: DataType.INTEGER})
    licenses_category_id: number;

    // @BelongsTo(() => LicensesCategory, {onDelete: 'cascade', onUpdate: 'cascade'})
    @BelongsTo(() => LicensesCategory)
    licenses_category: LicensesCategory;
}