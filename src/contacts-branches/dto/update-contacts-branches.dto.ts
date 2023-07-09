import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateContactBrancheDto {
    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должно содержать значение'})
    readonly city?: string;
    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должно содержать значение'})
    readonly name?: string;
    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должно содержать значение'})
    readonly address?: string;
    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должно содержать значение'})
    readonly contacts?: string;
}