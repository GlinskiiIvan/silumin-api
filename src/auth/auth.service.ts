import { HttpException, HttpStatus, UnauthorizedException, Injectable, Scope, Inject, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
    constructor(
        @Inject(REQUEST) private request: Request,
        private usersService: UsersService,
        private jwtService: JwtService
    ) {};

    private async generateToken(user: User) {
        const payload = {id: user.id, name: user.name, roles: user.roles};
        return {
            token: await this.jwtService.signAsync(payload)
        };
    }

    private async validateUser(dto: CreateUserDto) {
        const user = await this.usersService.getUserByName(dto.name);
        if(!user) throw new UnauthorizedException({message: 'Неверное имя или пароль'})

        const passworsEquals = await bcrypt.compare(dto.password, user.password);
        if(!passworsEquals) throw new UnauthorizedException({message: 'Неверное имя или пароль'})

        return user;
    }

    async registration(dto: CreateUserDto) {
        try {
            const passwordHash = await bcrypt.hash(dto.password, 7);
            const user = await this.usersService.createUser({name: dto.name, password: passwordHash, roles: dto.roles});

            return await this.generateToken(user);
        } catch (error) {
            console.log(error);
            throw new HttpException(`Ошибка при регистрации пользователя. ${error.message}`, error.status)
        }
    }
    
    async login(dto: CreateUserDto) {
        try {
            const user = await this.validateUser(dto);
            return await this.generateToken(user);
        } catch (error) {
            console.log(error);
            throw new HttpException(`Ошибка при входе. ${error.message}`, error.status)
        }
    }

    async check(@Request() req) {
        try {
            return {
                token: await this.jwtService.signAsync({id: req.user.id, name: req.user.name, roles: req.user.roles})
            };
        } catch (error) {
            console.log(error);
            throw new HttpException(`Ошибка при входе. ${error.message}`, error.status)
        }
    }
}
