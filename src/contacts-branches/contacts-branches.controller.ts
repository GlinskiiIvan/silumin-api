import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes } from '@nestjs/common';
import { ContactBranche } from './contacts-branches.model';
import { CreateContactBrancheDto } from './dto/create-contacts-branches.dto';
import { UpdateContactBrancheDto } from './dto/update-contacts-branches.dto';
import { ContactsBranchesService } from './contacts-branches.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Филиалы')
@ApiBearerAuth('token')
@Controller('contacts-branches')
export class ContactsBranchesController {
    constructor(private contactBrancheService: ContactsBranchesService) {};

    @ApiOperation({summary: 'Создание филиала'})
    @ApiResponse({status: 200, type: ContactBranche})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() dto: CreateContactBrancheDto) {
        return this.contactBrancheService.create(dto);
    }

    @ApiOperation({summary: 'Обновление филиала'})
    @ApiResponse({status: 200, type: [Number]})
    @UsePipes(ValidationPipe)
    @Patch(':id')
    update(@Param('id') id: number, @Body() dto: UpdateContactBrancheDto) {
        return this.contactBrancheService.update(id, dto);
    }

    @ApiOperation({summary: 'Удаление филиала'})
    @ApiResponse({status: 200, type: Number})
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.contactBrancheService.remove(id);
    }

    @ApiOperation({summary: 'Получение филиала'})
    @ApiResponse({status: 200, type: ContactBranche})
    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.contactBrancheService.getOne(id);
    }

    
    @ApiOperation({summary: 'Получение всех филиалов'})
    @ApiResponse({status: 200, type: [ContactBranche]})
    @Get()
    getAll() {
        return this.contactBrancheService.getAll();
    }
}
