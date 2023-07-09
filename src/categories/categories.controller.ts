import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesService } from './categories.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { Category } from './categories.model';

@ApiTags('Категории')
@ApiBearerAuth('token')
@Controller('categories')
export class CategoriesController {
    constructor(private categoryService: CategoriesService) {};

    @ApiOperation({summary: 'Создание категории'})
    @ApiResponse({status: 200, type: Category})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() dto: CreateCategoryDto) {
        return this.categoryService.create(dto);
    }

    @ApiOperation({summary: 'Обновление категории'})
    @ApiResponse({status: 200, type: Category})
    @UsePipes(ValidationPipe)
    @Patch(':id')
    update(@Param('id') id: number, @Body() dto: UpdateCategoryDto) {
        return this.categoryService.update(id, dto);
    }

    @ApiOperation({summary: 'Удаление категории'})
    @ApiResponse({status: 200, type: Category})
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.categoryService.remove(id);
    }

    @ApiOperation({summary: 'Получение категории'})
    @ApiResponse({status: 200, type: Category})
    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.categoryService.getOne(id);
    }

    @ApiOperation({summary: 'Получение всех категорий'})
    @ApiResponse({status: 200, type: Category})
    @Get()
    getAll() {
        return this.categoryService.getAll();
    }
}
