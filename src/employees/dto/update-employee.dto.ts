import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateEmployeeDto {
    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должно содержать значение'})
    readonly last_name?: string;
    
    @IsOptional()
    @IsString({message:'Должно быть строкой'})
    @IsNotEmpty({message: 'Должно содержать значение'})
    readonly first_name?: string;
    
    @IsOptional()
    @IsString({message:'Должно быть строкой'})
    @IsNotEmpty({message: 'Должно содержать значение'})
    readonly patronymic?: string;
    
    @IsOptional()
    @IsString({message:'Должно быть строкой'})
    @IsNotEmpty({message: 'Должно содержать значение'})
    readonly position?: string;

    @IsOptional()
    @IsString({message:'Должно быть строкой'})
    @IsNotEmpty({message: 'Должно содержать значение'})
    readonly contacts?: string;
}