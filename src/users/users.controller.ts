import { Controller, Post, Get, Patch, Body, Param, Delete, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/role-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { SetRolesUser } from './dto/set-roles-user.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Пользователи')
@ApiBearerAuth('token')
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {};

    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200, type: User})
    @Roles('Super')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }

    @ApiOperation({summary: 'Обновление пользователя'})
    @ApiResponse({status: 200, type: User})
    @Roles('Super')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Patch(':id')
    update(@Param('id') id: number, @Body() userDto: UpdateUserDto) {
        return this.userService.updateUser(id, userDto);
    }

    @ApiOperation({summary: 'Удаление пользователя'})
    @ApiResponse({status: 200, type: Number})
    @Roles('Super')
    @UseGuards(RolesGuard)
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.userService.removeUser(id);
    }
    
    @ApiOperation({summary: 'Получение одного пользователя'})
    @ApiResponse({status: 200, type: User})
    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.userService.getUser(id);
    }

    @ApiOperation({summary: 'Получение всех пользователей'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    getAll() {
        return this.userService.getAllUser();
    }
}
