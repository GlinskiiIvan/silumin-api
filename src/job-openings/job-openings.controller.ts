import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JobOpeningsService } from './job-openings.service';
import { CreateJobOpeningDto } from './dto/create-job-openings.dto';
import { UpdateJobOpeningDto } from './dto/update-job-openings.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { JobOpening } from './job-openings.model';

@ApiBearerAuth('token')
@ApiTags('Вакансии')
@Controller('job-openings')
export class JobOpeningsController {
    constructor(private jobOpeningService: JobOpeningsService) {};

    @ApiOperation({summary: 'Создание вкансии'})
    @ApiResponse({status: 200, type: JobOpening})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() dto: CreateJobOpeningDto) {
        return this.jobOpeningService.create(dto);
    }

    @ApiOperation({summary: 'Обновление вкансии'})
    @ApiResponse({status: 200, type: [Number]})
    @UsePipes(ValidationPipe)
    @Patch(':id')
    update(@Body() dto: UpdateJobOpeningDto, @Param('id') id: number) {
        return this.jobOpeningService.update(id, dto);
    }

    @ApiOperation({summary: 'Удаление вкансии'})
    @ApiResponse({status: 200, type: Number})
    @UsePipes(ValidationPipe)
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.jobOpeningService.remove(id);
    }

    @ApiOperation({summary: 'Получение одной вкансии'})
    @ApiResponse({status: 200, type: JobOpening})
    @UsePipes(ValidationPipe)
    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.jobOpeningService.getOne(id);
    }

    @ApiOperation({summary: 'Получение всех вкансий'})
    @ApiResponse({status: 200, type: [JobOpening]})
    @UsePipes(ValidationPipe)
    @Get()
    getAll() {
        return this.jobOpeningService.getAll();
    }
}
