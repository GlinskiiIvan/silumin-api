import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateProductDto {
    @IsOptional()
    @IsNotEmpty({message:'Должно содержать значение'})
    @IsString({message:'Должно быть строкой'})
    readonly title?: string;
    @IsOptional()
    @IsNotEmpty({message:'Должно содержать значение'})
    @IsString({message:'Должно быть строкой'})
    readonly content?: string;
    @IsOptional() 
    @IsNotEmpty({message:'Должно содержать значение'})
    @IsString({message:'Должно быть строкой'})
    readonly employees?: string; 
    @IsOptional()
    @IsNotEmpty({message:'Должно содержать значение'})
    @IsString({message:'Должно быть строкой'})
    readonly equipments?: string; 
    @IsOptional()
    @IsNotEmpty({message:'Должно содержать значение'})
    @IsString({message:'Должно быть строкой'})
    readonly documents_names?: string; 
    @IsOptional()
    @IsNotEmpty({message:'Должно содержать значение'})
    @IsString({message:'Должно быть строкой'})
    readonly documents_remove?: string;
}