import { IsNotEmpty, IsString } from "class-validator";

export class CreateDutyDto {
    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должнго содержать значение'})
    readonly value: string;

    @IsNotEmpty({message: 'Должнго содержать значение'})
    readonly job_opening_id : number;
}