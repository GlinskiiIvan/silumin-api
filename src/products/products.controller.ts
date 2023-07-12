import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFiles, UseInterceptors, UsePipes } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.model';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {PublicRoute} from "../decorators/public-route.decorator";

@ApiTags('Продукциия')
@ApiBearerAuth('token')
@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService) {};

    @ApiOperation({summary: 'Создание продукции'})
    @ApiResponse({status: 200, type: Product})
    @UsePipes(ValidationPipe)
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'documents'},
        {name: 'image'}
    ]))
    @Post()
    create(@Body() dto: CreateProductDto, @UploadedFiles() {documents, image}) {
        return this.productService.create(dto, documents, image);
    }

    @ApiOperation({summary: 'Обновление продукции'})
    @ApiResponse({status: 200, type: Product})
    @UsePipes(ValidationPipe)
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'documents'},
        {name: 'image'}
    ]))
    @Patch(':id')
    update(@Param('id') id: number, @Body() dto: UpdateProductDto, @UploadedFiles() {documents, image}) {
        return this.productService.update(id, dto, documents, image);
    }

    @ApiOperation({summary: 'Удаление продукции'})
    @ApiResponse({status: 200, type: Number})
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.productService.remove(id);
    }

    @ApiOperation({summary: 'Получение продукции'})
    @ApiResponse({status: 200, type: Product})
    @PublicRoute()
    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.productService.getOne(id);
    }

    @ApiOperation({summary: 'Получение всех продукций'})
    @ApiResponse({status: 200, type: [Product]})
    @PublicRoute()
    @Get()
    getAll() {
        return this.productService.getAll();
    }
}
