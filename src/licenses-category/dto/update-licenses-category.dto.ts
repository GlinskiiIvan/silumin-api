import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateLicensesCategoryDto {
    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должнго содержать значение'})
    readonly name?: string;

    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должнго содержать значение'})
    readonly licenses_remove?: string
}