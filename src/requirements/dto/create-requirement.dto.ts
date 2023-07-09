import { IsNotEmpty, IsString } from "class-validator";

export class CreateRequirementDto {
    @IsString({message: 'Должно быть строкой'})
    @IsNotEmpty({message: 'Должнго содержать значение'})
    readonly value: string;
}