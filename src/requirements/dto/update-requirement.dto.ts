import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateRequirementDto {
    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должнго содержать значение'})
    readonly value?: string;
}