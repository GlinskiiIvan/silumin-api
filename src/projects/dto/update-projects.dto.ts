import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateProjectDto {
    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должно содержать значение'})
    readonly title?: string;
    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должно содержать значение'})
    readonly short_desc?: string;
    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должно содержать значение'})
    readonly content?: string;
    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должно содержать значение'})
    readonly documents_names?: string;
    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должно содержать значение'})
    readonly documents_remove?: string;
}