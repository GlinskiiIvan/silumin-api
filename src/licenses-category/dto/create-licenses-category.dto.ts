import { IsNotEmpty, IsString } from "class-validator";

export class CreateLicensesCategoryDto {
    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должнго содержать значение'})
    readonly name: string;
}