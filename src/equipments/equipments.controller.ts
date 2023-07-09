import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UploadedFiles, UseInterceptors, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EquipmentsService } from './equipments.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { Equipment } from './equipments.model';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Оборудование')
@ApiBearerAuth('token')
@Controller('equipments')
export class EquipmentsController {
    constructor(private equipmentService: EquipmentsService) {};

    @ApiOperation({summary: ''})
    @ApiResponse({status: 200, type: Equipment})
    @UsePipes(ValidationPipe)
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'documents'},
        {name: 'image'}
    ]))
    @Post()
    create(@Body() dto: CreateEquipmentDto,  @UploadedFiles() {documents, image}) {
        return this.equipmentService.create(dto, documents, image);
    }

    @ApiOperation({summary: ''})
    @ApiResponse({status: 200, type: [Number]})
    @UsePipes(ValidationPipe)
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'documents'},
        {name: 'image'}
    ]))
    @Patch(':id')
    update(@Param('id') id: number, @Body() dto: UpdateEquipmentDto, @UploadedFiles() {documents, image}) {
        return this.equipmentService.update(id, dto, documents, image);
    }

    @ApiOperation({summary: ''})
    @ApiResponse({status: 200, type: Number})
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.equipmentService.remove(id);
    }
    @ApiOperation({summary: ''})
    @ApiResponse({status: 200, type: Equipment})
    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.equipmentService.getOne(id);
    }
    @ApiOperation({summary: ''})
    @ApiResponse({status: 200, type: [Equipment]})
    @Get()
    getAll() {
        return this.equipmentService.getAll();
    }
}