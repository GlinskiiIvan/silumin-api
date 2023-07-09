import { IsNotEmpty, IsString, IsDate, IsOptional } from "class-validator";

export class UpdateNewsDto {
    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должно содержать значние'})
    readonly title?: string;

    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должно содержать значние'})
    readonly sub_title?: string;

    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должно содержать значние'})
    readonly content?: string;

    @IsOptional()
    @IsString({message: 'Должно быть датой'})
    @IsNotEmpty({message: 'Должно содержать значние'})
    readonly date?: Date;
}