import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEquipmentDto {
    @IsNotEmpty({message:'Должно содержать значение'})
    @IsString({message: 'Должно быть строкой'})
    readonly title: string;
    @IsNotEmpty({message:'Должно содержать значение'})
    @IsString({message: 'Должно быть строкой'})
    readonly content: string;
    // @IsNotEmpty({message:'Должно содержать значение'})
    // readonly product_id: number;
    @IsNotEmpty({message:'Должно содержать значение'})
    @IsString({message: 'Должно быть строкой'})
    readonly specifications: string;
    @IsNotEmpty({message:'Должно содержать значение'})
    @IsString({message: 'Должно быть строкой'})
    readonly documents_names: string;
    @IsOptional()
    @IsNotEmpty({message:'Должно содержать значение'})
    @IsString({message: 'Должно быть строкой'})
    readonly employees?: string;
}