import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateLicensesDto {
    // @IsNumber()
    @IsNotEmpty({message: 'Должно содержать значение'})
    readonly licenses_category_id: number;
}