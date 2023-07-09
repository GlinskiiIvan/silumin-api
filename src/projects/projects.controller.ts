import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UploadedFiles, UseInterceptors, UsePipes } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-projects.dto';
import { UpdateProjectDto } from './dto/update-projects.dto';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { Project } from './projects.model';

@ApiTags('Проекты')
@ApiBearerAuth('token')
@Controller('projects')
export class ProjectsController {
    constructor(private projectService: ProjectsService) {};

    @ApiOperation({summary: 'Создание проекта'})
    @ApiResponse({status: 200, type: Project})
    @UsePipes(ValidationPipe)
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'documents'},
        {name: 'image'}
    ]))
     create(@Body() dto: CreateProjectDto, @UploadedFiles() {documents, image}) {
        return this.projectService.create(dto, image, documents);
    }
    
    @ApiOperation({summary: 'Редактирование проекта'})
    @ApiResponse({status: 200, type: [Number]})
    @UsePipes(ValidationPipe)
    @Patch('id')
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'documents'},
        {name: 'image'}
    ]))
     update(@Param('id') id: number, @Body() dto: UpdateProjectDto,@UploadedFiles() {documents, image}) {
        return this.projectService.update(id, dto, image, documents);
    }

    @ApiOperation({summary: 'Удаление проекта'})
    @ApiResponse({status: 200, type: Number})
    @Delete('id')
     remove(@Param('id') id: number) {
        return this.projectService.remove(id);
    }

    @ApiOperation({summary: 'получение проекта'})
    @ApiResponse({status: 200, type: Project})
    @Get('id')
     getOne(@Param('id') id: number) {
        return this.projectService.getOne(id);
    }

    @ApiOperation({summary: 'Получение всех проектов'})
    @ApiResponse({status: 200, type: [Project]})
    @Get()
     getAll() {
        return this.projectService.getAll();
    }
}
