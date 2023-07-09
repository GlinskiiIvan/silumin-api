import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UsersRoles } from "./users-roles.model";

interface IRoleCreationAttr {
    value: string;
    description: string;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, IRoleCreationAttr> {
    @ApiProperty({example: 1, description: 'Уникальный ID роли'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})    
    id: number;

    @ApiProperty({example: 'SuperAdmin', description: 'Уникольное значение роли'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    @ApiProperty({example: 'Роль предоставляющая полный доступ', description: 'Описание роли'})
    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @BelongsToMany(() => User, () => UsersRoles)
    users: User[]
}