import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateEquipmentDto {
    @IsOptional()
    @IsNotEmpty({message:'Должно содержать значение'})
    @IsString({message: 'Должно быть строкой'})
    readonly title?: string;
    @IsOptional()
    @IsNotEmpty({message:'Должно содержать значение'})
    @IsString({message: 'Должно быть строкой'})
    readonly content?: string;
    // @IsOptional()
    // @IsNotEmpty({message:'Должно содержать значение'})
    // readonly product_id?: number;
    @IsOptional()
    @IsNotEmpty({message:'Должно содержать значение'})
    @IsString({message: 'Должно быть строкой'})
    readonly employees?: string;
    @IsOptional()
    @IsNotEmpty({message:'Должно содержать значение'})
    @IsString({message: 'Должно быть строкой'})
    readonly specifications_add?: string;
    @IsOptional()
    @IsNotEmpty({message:'Должно содержать значение'})
    @IsString({message: 'Должно быть строкой'})
    readonly specifications_remove?: string;
    @IsOptional()
    @IsNotEmpty({message:'Должно содержать значение'})
    @IsString({message: 'Должно быть строкой'})
    readonly documents_names?: string;
    @IsOptional()
    @IsNotEmpty({message:'Должно содержать значение'})
    @IsString({message: 'Должно быть строкой'})
    readonly documents_remove?: string;
}