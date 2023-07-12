import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './roles.model';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/role-auth.decorator';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Роли')
@ApiBearerAuth('token')
@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) {}

    @ApiOperation({summary: 'Создание роли'})
    @ApiResponse({status: 200, type: Role})
    // @Roles('Super')
    // @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Post()
    createRole(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }

    @ApiOperation({summary: 'Обновление роли'})
    @ApiResponse({status: 200, type: [Number]})
    // @Roles('Super')
    // @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Patch(':id')
    updateRole(@Param('id') id: number, @Body() dto: UpdateRoleDto) {
        return this.roleService.updateRole(id, dto);
    }

    @ApiOperation({summary: 'Удаление роли'})
    @ApiResponse({status: 200, type: Number})
    // @Roles('Super')
    // @UseGuards(RolesGuard)
    @Delete(':id')
    removeRole(@Param('id') id: number) {
        return this.roleService.removeRole(id);
    }

    // @ApiOperation({summary: 'Получение роли по значению'})
    // @ApiResponse({status: 200, type: Role})
    // @Get(':value')
    // getRoleByValue(@Param('value') value: string) {
    //     return this.roleService.getRoleByValue(value);
    // }

    @ApiOperation({summary: 'Получение роли по значению'})
    @ApiResponse({status: 200, type: Role})
    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.roleService.getOne(id);
    }

    @ApiOperation({summary: 'Получение всех ролей'})
    @ApiResponse({status: 200, type: [Role]})
    @Get()
    getAll() {
        return this.roleService.getAll();
    }
}
