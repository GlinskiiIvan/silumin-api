import { FilesService } from 'src/files/files.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from './projects.model';
import { DocumentsService } from 'src/documents/documents.service';
import { CreateProjectDto } from './dto/create-projects.dto';
import { UpdateProjectDto } from './dto/update-projects.dto';
import { FileTypesEnum } from 'src/enums/file-types.enum';

@Injectable()
export class ProjectsService {
    constructor(@InjectModel(Project) private projectRepository: typeof Project,
    private documentServise: DocumentsService, private fileService: FilesService) {};

    async create(dto: CreateProjectDto, image, documents) {
        const candidate = await this.projectRepository.findOne({where: {title: dto.title}});
        if(candidate) throw new HttpException('Проект с таким названием уже существует. Ошибка при создании проекта', HttpStatus.BAD_REQUEST);

        const {documents_names, ...otherProps} = dto;
        const imageName = await this.fileService.create(image[0], FileTypesEnum.image);
        const project = await this.projectRepository.create({...otherProps, image: imageName});

        if(documents && documents_names) {
            const documentsNamesParsed: string[] = JSON.parse(documents_names);
            documents.forEach(async (item, index) => {
                await this.documentServise.create({project_id: project.id, name: documentsNamesParsed[index]}, item);
            });
        }

        return project;
    }

    async update(id: number, dto: UpdateProjectDto, image, documents) {
        const project = await this.projectRepository.findByPk(id);
        if(!project) throw new HttpException('Проект не найден. Ошибка при Редактировании проекта', HttpStatus.NOT_FOUND);

        const {documents_names, documents_remove, ...mainProps} = dto;

        await this.projectRepository.update(mainProps, {where:{id}});

        if(image) {
            const imageName = await this.fileService.create(image[0], FileTypesEnum.image);
            await this.projectRepository.update({image: imageName}, {where:{id}});
            await this.fileService.remove(project.image, FileTypesEnum.image);
        }

        if(documents && documents_names) {
            const documentsNamesParsed: string[] = JSON.parse(documents_names);
            documents.forEach(async (item, index) => {
                await this.documentServise.create({project_id: project.id, name: documentsNamesParsed[index]}, item);
            });
        }
        
        if(documents_remove) {
            const documentsRemoveParsed: number[] = JSON.parse(documents_remove);
            documentsRemoveParsed.forEach(async (item_id) => {
                await this.documentServise.remove(item_id);
            })
        }

        return project;
    }

    async remove(id: number) {
        const project = await this.projectRepository.findByPk(id);
        if(!project) throw new HttpException('Проект не найден. Ошибка при удалении проекта', HttpStatus.NOT_FOUND);

        if(project.documents.length) {
            project.documents.forEach(async (item) => {
                await this.documentServise.remove(item.id);
            })
        } else {
            return await this.projectRepository.destroy({where:{id}});
        }
    }

    async getOne(id: number) {
        return await this.projectRepository.findByPk(id, {include:['documents']});
    }

    async getAll() {
        return await this.projectRepository.findAll({include:['documents']});
    }
}
