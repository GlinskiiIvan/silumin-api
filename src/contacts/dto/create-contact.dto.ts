import { IsNotEmpty, IsString } from "class-validator";

export class CreateContactDto {
    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должнго содержать значение'})
    readonly value: string;

    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должнго содержать значение'})
    readonly type: string;

    @IsNotEmpty({message: 'Должнго содержать значение'})
    readonly employee_id?: number;
    @IsNotEmpty({message: 'Должнго содержать значение'})
    readonly contact_branche_id?: number;
}