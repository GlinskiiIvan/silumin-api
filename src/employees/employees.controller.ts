import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { Employee } from './employees.model';

@ApiTags('Сотрудники')
@ApiBearerAuth('token')
@Controller('employees')
export class EmployeesController {
    constructor(private employeeService: EmployeesService) {};

    @ApiOperation({summary: 'Создание сотрудника'})
    @ApiResponse({status: 200, type: Employee})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() dto: CreateEmployeeDto) {
        return this.employeeService.create(dto);
    }

    @ApiOperation({summary: 'Обновление сотрудника'})
    @ApiResponse({status: 200, type: [Number]})
    @UsePipes(ValidationPipe)
    @Patch(':id')
    update(@Param('id') id: number, @Body() dto: UpdateEmployeeDto) {
        return this.employeeService.update(id, dto);
    }

    @ApiOperation({summary: 'Удаление сотрудника'})
    @ApiResponse({status: 200, type: Number})
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.employeeService.remove(id);
    }

    @ApiOperation({summary: 'Получение сотрудника'})
    @ApiResponse({status: 200, type: Employee})
    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.employeeService.getOne(id);
    }

    
    @ApiOperation({summary: 'Получение всех сотрудников'})
    @ApiResponse({status: 200, type: [Employee]})
    @Get()
    getAll() {
        return this.employeeService.getAll();
    }
}
