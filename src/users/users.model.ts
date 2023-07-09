import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UsersRoles } from "src/roles/users-roles.model";

interface IUserCreationAttr {
    name: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, IUserCreationAttr> {
    @ApiProperty({example: 1, description: 'Уникальный ID пользователя'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})    
    id: number;

    @ApiProperty({example: 'Ivan', description: 'Имя пользователя'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;

    @ApiProperty({example: 'Pass1234$', description: 'Пароль пользователя'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @BelongsToMany(() => Role, () => UsersRoles)
    roles: Role[]
}