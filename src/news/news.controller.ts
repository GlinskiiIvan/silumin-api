import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { News } from './news.model';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { NewsService } from './news.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import {PublicRoute} from "../decorators/public-route.decorator";

@ApiBearerAuth('token')
@ApiTags('Новости')
@Controller('news')
export class NewsController {
    constructor(private newsService: NewsService) {}
    
    @ApiOperation({summary: 'Создание новости'})
    @ApiResponse({status: 200, type: News})
    @UsePipes(ValidationPipe)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
        type: 'object',
        properties: {
            title: {
                type: 'string',
            },
            sub_title: {
                type: 'string',
            },
            content: {
                type: 'string',
            },
            date: {
                type: 'string',
            },
            image: {
                type: 'string',
                format: 'binary',
            },
        },
        },
    })
    create(@Body() dto: CreateNewsDto, @UploadedFile() image) {
        return this.newsService.create(dto, image);
    }

    @ApiOperation({summary: 'Обновление новости'})
    @ApiResponse({status: 200, type: [Number]})
    @Patch(':id')
    @UseInterceptors(FileInterceptor('image'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
        type: 'object',
        properties: {
            title: {
                type: 'string',
            },
            sub_title: {
                type: 'string',
            },
            content: {
                type: 'string',
            },
            date: {
                type: 'string',
            },
            image: {
                type: 'string',
                format: 'binary',
            },
        },
        },
    })
    update(@Body() dto: UpdateNewsDto, @Param('id') id: number, @UploadedFile() image) {
        return this.newsService.update(dto, id, image);
    }

    @ApiOperation({summary: 'Удаление новости'})
    @ApiResponse({status: 200, type: Number})
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.newsService.remove(id);
    }

    @ApiOperation({summary: 'Получение новости'})
    @ApiResponse({status: 200, type: News})
    @PublicRoute()
    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.newsService.getOne(id);
    }

    @ApiOperation({summary: 'Получение всех новостей'})
    @ApiResponse({status: 200, type: [News]})
    @PublicRoute()
    @Get()
    getAll() {
        return this.newsService.getAll();
    }
}