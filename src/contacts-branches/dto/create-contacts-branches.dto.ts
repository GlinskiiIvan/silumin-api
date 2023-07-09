import { IsNotEmpty, IsString } from "class-validator";

export class CreateContactBrancheDto {
    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должно содержать значение'})
    readonly city: string;
    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должно содержать значение'})
    readonly name: string;
    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должно содержать значение'})
    readonly address: string;
    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должно содержать значение'})
    readonly contacts: string;
}

"[{\"value\": \"string\", \"type\": \"string\"}]"