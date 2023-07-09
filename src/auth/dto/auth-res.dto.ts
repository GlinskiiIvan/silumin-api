import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AuthResDto {
    @IsNotEmpty({message:'Должно содержать значение'})
    @IsString({message: 'Должно быть строкой'})
    @ApiProperty({example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlN1cGVyIEFkbWluIEl2YW4iLCJyb2xlcyI6W3siaWQiO', description: 'Токен пользователя'})
    readonly token: string
}