import { IsNotEmpty, IsString, IsDate } from "class-validator";

export class CreateNewsDto {
    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должно содержать значние'})
    readonly title: string;

    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должно содержать значние'})
    readonly sub_title: string;

    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должно содержать значние'})
    readonly content: string;

    @IsString({message: 'Должно быть датой'})
    @IsNotEmpty({message: 'Должно содержать значние'})
    readonly date: Date;
}