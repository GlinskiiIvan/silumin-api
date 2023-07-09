import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateCategoryDto {
    @IsOptional()
    @IsNotEmpty({message:'Должно содержать значение'})
    @IsString({message:'Должно быть строкой'})
    readonly name?: string;
    
    @IsOptional()
    @IsNotEmpty({message:'Должно содержать значение'})
    @IsString({message:'Должно быть строкой'})
    readonly products?: string;
    
    @IsOptional()
    @IsNotEmpty({message:'Должно содержать значение'})
    @IsString({message:'Должно быть строкой'})
    readonly services?: string;
}