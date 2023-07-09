import { Column, DataType, Model, Table, ForeignKey } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Role } from "./roles.model";

@Table({tableName: 'users_roles'})
export class UsersRoles extends Model<UsersRoles> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})    
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    user_id: number;

    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
    role_id: number;
}