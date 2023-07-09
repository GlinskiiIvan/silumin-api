import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDocumentDto {
    @IsOptional()
    @IsNotEmpty({message: 'Должно содержать значение'})
    readonly product_id?: number;
    @IsOptional()
    @IsNotEmpty({message: 'Должно содержать значение'})
    readonly service_id?: number;
    @IsOptional()
    @IsNotEmpty({message: 'Должно содержать значение'})
    readonly equipment_id?: number;
    @IsOptional()
    @IsNotEmpty({message: 'Должно содержать значение'})
    readonly project_id?: number;
    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должно содержать значение'})
    readonly name: string;
}