import { IsNotEmpty, IsString } from "class-validator";

export class CreateSpecificationDto {
    @IsNotEmpty({message: 'Должно содержать значение'})
    @IsString({message: 'Должно быть строкой'})
    readonly name: string;
    @IsNotEmpty({message: 'Должно содержать значение'})
    @IsString({message: 'Должно быть строкой'})
    readonly value: string;
    @IsNotEmpty({message: 'Должно содержать значение'})
    readonly equipment_id: number;
}