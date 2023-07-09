import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Equipment } from "src/equipments/equipments.model";
import { Product } from "src/products/products.model";
import { Project } from "src/projects/projects.model";
import { Service } from "src/services/services.model";

interface IDocumentsCreationAttr {
    product_id: number;
    service_id: number;
    equipment_id: number;
    project_id: number;
    name: string;
    document: string;
}

@Table({tableName: 'documents'})
export class Document extends Model<Document, IDocumentsCreationAttr> {
    @ApiProperty({example: 1, description: 'Уникальный ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})    
    id: number;

    @ApiProperty({example: '2', description: 'Внешний ключ на продукт'})
    @ForeignKey(() => Product)
    @Column({type: DataType.INTEGER})
    product_id: number;

    @ApiProperty({example: '4', description: 'Внешний ключ на услугу'})
    @ForeignKey(() => Service)
    @Column({type: DataType.INTEGER})  
    service_id: number;

    @ApiProperty({example: '21', description: 'Внешний ключ на оборудование'})
    @ForeignKey(() => Equipment)
    @Column({type: DataType.INTEGER})  
    equipment_id: number;

    @ApiProperty({example: '45', description: 'Внешний ключ на проект'})
    @ForeignKey(() => Project)
    @Column({type: DataType.INTEGER})  
    project_id: number;

    @ApiProperty({example: 'Сертификат о партнёрстве с Danfoss', description: 'Название которое будет отоброжаться на сайте'})
    @Column({type: DataType.STRING, allowNull: false})  
    name: string;

    @ApiProperty({example: 'sfd-dfsf-sf-dsfs.pdf', description: 'Какой либо документ'})
    @Column({type: DataType.STRING, allowNull: false})  
    document: string;

    @BelongsTo(() => Product, {onDelete: 'cascade', onUpdate: 'cascade', foreignKey: 'product_id'})
    product: Product
    @BelongsTo(() => Service, {onDelete: 'cascade', onUpdate: 'cascade', foreignKey: 'service_id'})
    service: Service
    @BelongsTo(() => Equipment, {onDelete: 'cascade', onUpdate: 'cascade'})
    equipment: Equipment
    @BelongsTo(() => Project, {onDelete: 'cascade', onUpdate: 'cascade', foreignKey: 'project_id'})
    project: Project
}