import { IsNotEmpty, IsOptional, IsString, Length, Matches } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message:'Должно содержать значение'})
    @IsString({message: 'Должно быть строкой'})
    readonly name: string;

    @IsNotEmpty({message:'Должно содержать значение'})
    @IsString({message: 'Должно быть строкой'})
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,16}$/, {message: 'Пароль должен содержать цифры, специальные символы, строчные и заглавные буквы'})
    @Length(4, 16, {message: 'Длина должна быть не меньше 4 и не больше 16'})
    readonly password: string;

    @IsOptional()
    @IsNotEmpty({message:'Должно содержать значение'})
    @IsString({message: 'Должно быть строкой'})
    readonly roles?: string;
}