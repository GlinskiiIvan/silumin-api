import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFiles, UseInterceptors, UsePipes } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { Service } from './services.model';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiTags('Услуги')
@ApiBearerAuth('token')
@Controller('services')
export class ServicesController {
    constructor(private serviceService: ServicesService) {};

    @ApiOperation({summary: 'Создание услуги'})
    @ApiResponse({status: 200, type: Service})
    @UsePipes(ValidationPipe)
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'documents'},
        {name: 'image'}
    ]))
    @Post()
    create(@Body() dto: CreateServiceDto, @UploadedFiles() {documents, image}) {
        return this.serviceService.create(dto, documents, image);
    }

    @ApiOperation({summary: 'Обновление услуги'})
    @ApiResponse({status: 200, type: Service})
    @UsePipes(ValidationPipe)
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'documents'},
        {name: 'image'}
    ]))
    @Patch(':id')
    update(@Param('id') id: number, @Body() dto: UpdateServiceDto, @UploadedFiles() {documents, image}) {
        return this.serviceService.update(id, dto, documents, image);
    }

    @ApiOperation({summary: 'Удаление услуги'})
    @ApiResponse({status: 200, type: Number})
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.serviceService.remove(id);
    }

    @ApiOperation({summary: 'Получение услуги'})
    @ApiResponse({status: 200, type: Service})
    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.serviceService.getOne(id);
    }

    @ApiOperation({summary: 'Получение всех услуг'})
    @ApiResponse({status: 200, type: [Service]})
    @Get()
    getAll() {
        return this.serviceService.getAll();
    }
}
