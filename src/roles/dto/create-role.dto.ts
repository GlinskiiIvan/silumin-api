import {IsNotEmpty, IsOptional, IsString, Length} from "class-validator";

export class CreateRoleDto {
    @IsNotEmpty({message:'Должно содержать значение'})
    @IsString({message: 'Должно быть строкой'})
    readonly value: string;
    @IsNotEmpty({message:'Должно содержать значение'})
    @IsString({message: 'Должно быть строкой'})
    readonly description: string;
    @IsOptional()
    @IsNotEmpty({message:'Должно содержать значение'})
    @IsString({message: 'Должно быть строкой'})
    readonly users?: string;
}