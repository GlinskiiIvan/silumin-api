import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateJobOpeningDto {
    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должнго содержать значение'})
    readonly name: string;

    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    readonly description?: string;

    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должнго содержать значение'})
    readonly duties: string;

    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должнго содержать значение'})
    readonly requirements: string;
}