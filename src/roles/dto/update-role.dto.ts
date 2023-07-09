import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class UpdateRoleDto {
    @IsOptional()
    @IsNotEmpty({message:'Должно содержать значение'})
    @IsString({message: 'Должно быть строкой'})
    readonly value?: string;
    @IsOptional()
    @IsNotEmpty({message:'Должно содержать значение'})
    @IsString({message: 'Должно быть строкой'})
    readonly description?: string;
    @IsOptional()
    @IsNotEmpty({message:'Должно содержать значение'})
    @IsString({message: 'Должно быть строкой'})
    readonly users?: string;
}