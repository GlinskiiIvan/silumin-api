import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateJobOpeningDto {
    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должнго содержать значение'})
    readonly name?: string;

    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должнго содержать значение'})
    readonly description?: string;

    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должнго содержать значение'})
    readonly requirements?: string;

    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должнго содержать значение'})
    readonly duties?: string;
}