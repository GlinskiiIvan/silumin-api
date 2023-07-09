import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RequirementsService } from './requirements.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Requirement } from './requirements.model';
import { CreateRequirementDto } from './dto/create-requirement.dto';
import { UpdateRequirementDto } from './dto/update-requirement.dto';

@ApiTags('Требования')
@ApiBearerAuth('token')
@Controller('requirements')
export class RequirementsController {
    constructor(private requirementService: RequirementsService) {};

    @ApiOperation({summary: 'Создание требования'})
    @ApiResponse({status: 200, type: Requirement})
    @Post()
    async create(@Body() dto: CreateRequirementDto) {
        return this.requirementService.create(dto);
    }

    @ApiOperation({summary: 'Обновление требования'})
    @ApiResponse({status: 200, type: Requirement})
    @Patch(':id')
    async update(@Param('id') id: number, @Body() dto: UpdateRequirementDto) {
        return this.requirementService.update(id, dto);
    }

    @ApiOperation({summary: 'Удаление требования'})
    @ApiResponse({status: 200, type: Number})
    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.requirementService.remove(id);
    }

    @ApiOperation({summary: 'Получение требования'})
    @ApiResponse({status: 200, type: Requirement})
    @Get(':id')
    async getOne(@Param('id') id: number) {
        return this.requirementService.getOne(id);
    }

    @ApiOperation({summary: 'Получение требований'})
    @ApiResponse({status: 200, type: [Requirement]})
    @Get()
    async getAll() {
        return this.requirementService.getAll();
    }
}