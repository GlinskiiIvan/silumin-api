import { IsString } from 'class-validator';
import {IsInt, IsNotEmpty, Length} from 'class-validator';

export class SetRolesUser {   
    @IsInt({message: "Должно быть числом"}) 
    @IsNotEmpty({message: 'Должно содержать значение'})
    readonly user_id: number

    @IsString({message: "Должно быть строкой"}) 
    @IsNotEmpty({message: 'Должно содержать значение'})
    readonly roles: string
}