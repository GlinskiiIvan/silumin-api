import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UploadedFiles, UseInterceptors, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LicensesCategoryService } from './licenses-category.service';
import { CreateLicensesCategoryDto } from './dto/create-licenses-category.dto';
import { UpdateLicensesCategoryDto } from './dto/update-licenses-category.dto';
import { LicensesCategory } from './licenses-category.model';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('Категории лицензий')
@ApiBearerAuth('token')
@Controller('licenses-category')
export class LicensesCategoryController {
    constructor(private licensesCategotyService: LicensesCategoryService) {}

    @ApiOperation({summary: 'Создание категории лицензий'})
    @ApiResponse({status: 200, type: LicensesCategory})
    @UsePipes(ValidationPipe)
    @Post()
    @UseInterceptors(FilesInterceptor('images'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
        type: 'object',
        properties: {
            name: {
                type: 'string',
            },
            images: {
                type: 'string',
                format: 'binary',
            },
        },
        },
    })
    create(@Body() dto: CreateLicensesCategoryDto, @UploadedFiles() images) {
        return this.licensesCategotyService.create(dto, images);
    }

    @ApiOperation({summary: 'Обновление категории лицензий'})
    @ApiResponse({status: 200, type: LicensesCategory})
    @UsePipes(ValidationPipe)
    @Patch(':id')
    @UseInterceptors(FilesInterceptor('images'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
        type: 'object',
        properties: {
            name: {
                type: 'string',
            },
            images: {
                type: 'string',
                format: 'binary',
            },
        },
        },
    })
    update(@Param('id') id: number, @Body() dto: UpdateLicensesCategoryDto, @UploadedFiles() images) {
        return this.licensesCategotyService.update(id, dto, images);
    }

    @ApiOperation({summary: 'Удаление категории лицензий'})
    @ApiResponse({status: 200, type: Number})
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.licensesCategotyService.remove(id);
    }

    @ApiOperation({summary: 'Получение одной категории лицензий'})
    @ApiResponse({status: 200, type: LicensesCategory})
    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.licensesCategotyService.getOne(id);
    }

    @ApiOperation({summary: 'Получение всех категорий лицензий'})
    @ApiResponse({status: 200, type: [LicensesCategory]})
    @Get()
    getAll() {
        return this.licensesCategotyService.getAll();
    }
}
