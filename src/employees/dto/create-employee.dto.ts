import { IsNotEmpty, IsString } from "class-validator";

export class CreateEmployeeDto {
    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должно содержать значение'})
    readonly last_name: string;

    @IsString({message:'Должно быть строкой'})
    @IsNotEmpty({message: 'Должно содержать значение'})
    readonly first_name: string;

    @IsString({message:'Должно быть строкой'})
    @IsNotEmpty({message: 'Должно содержать значение'})
    readonly patronymic: string;

    @IsString({message:'Должно быть строкой'})
    @IsNotEmpty({message: 'Должно содержать значение'})
    readonly position: string;

    @IsString({message:'Должно быть строкой'})
    @IsNotEmpty({message: 'Должно содержать значение'})
    readonly contacts: string;
}