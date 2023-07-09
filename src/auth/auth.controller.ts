import {Body, Controller, Get, Post, Req, Type, UseGuards, UsePipes, Request} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Roles } from './role-auth.decorator';
import { RolesGuard } from './roles.guard';
import { AuthResDto } from './dto/auth-res.dto';
import { PublicRoute } from 'src/decorators/public-route.decorator';
import {ValidationPipe} from "../pipes/validation.pipe";
// import { Request } from 'express';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {};
    
    @ApiBearerAuth('token')
    @ApiOperation({summary: 'Регистрация'})
    @ApiResponse({status: 200, type: AuthResDto})
    @Roles('Super')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Post('/registration')
    registration(@Body() dto: CreateUserDto) {
        return this.authService.registration(dto);
    }

    @ApiOperation({summary: 'Вход'})
    @ApiResponse({status: 200, type: AuthResDto})
    @PublicRoute()
    @Post('/login')
    login(@Body() dto: CreateUserDto) {
        return this.authService.login(dto);
    }

    @Get('/check-auth')
    check(@Request() req) {
        return this.authService.check(req);
    }
}
