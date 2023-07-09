import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from './services.model';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { FilesService } from 'src/files/files.service';
import { DocumentsService } from 'src/documents/documents.service';
import { FileTypesEnum } from 'src/enums/file-types.enum';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class ServicesService {
    constructor(
        @InjectModel(Service) private serviceRepository: typeof Service,
        private fileService: FilesService,
        private documentService: DocumentsService,
        private employeeService: EmployeesService
    ) {};

    async create(dto: CreateServiceDto, documents, image) {
        try {
            const {title, content} = dto;
            const candidate = await this.serviceRepository.findOne({where:{title}})
            if(candidate) throw new HttpException('Услуга с таким названием уже существует! Ошибка при создании услуги', HttpStatus.BAD_REQUEST);

            const fileName = await this.fileService.create(image[0], FileTypesEnum.image);
            const service = await this.serviceRepository.create({title, content, image: fileName});

            if(documents && dto.documents_names) {
                const documentsNames: string[] = JSON.parse(dto.documents_names);

                documents.forEach(async (item, index) => {
                    await this.documentService.create({name: documentsNames[index], service_id: service.id}, item);
                })
            }

            if(dto.employees) {
                await service.$set('employees', []);

                const employees: number[] = JSON.parse(dto.employees);

                employees.forEach(async (item_id) => {
                    const employee = await this.employeeService.getOne(item_id);
                    await service.$add('employees', employee);
                })
            }

            return service;
        } catch (error) {
            console.log(error);
            throw new HttpException('Ошибка при создании услуги', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: number, dto: UpdateServiceDto, documents, image) {
        try {            
            const service = await this.serviceRepository.findByPk(id);
            if(!service) throw new HttpException('Услуга не найдена! Ошибка при обновлении услуги', HttpStatus.NOT_FOUND);

            const {title, content} = dto;
            await this.serviceRepository.update({title, content}, {where:{id}});

            if(image) {
                await this.fileService.remove(service.image, FileTypesEnum.image);
                const fileName = await this.fileService.create(image[0], FileTypesEnum.image);
                await this.serviceRepository.update({image: fileName}, {where:{id}});
            }

            if(documents && dto.documents_names) {
                const documentsNames: string[] = JSON.parse(dto.documents_names);

                documents.forEach(async (item, index) => {
                    await this.documentService.create({name: documentsNames[index], service_id: service.id}, item);
                })
            }

            if(dto.documents_remove) {
                const documentsRemove: number[] = JSON.parse(dto.documents_remove);

                documentsRemove.forEach(async (item_id) => {
                    await this.documentService.remove(item_id);
                })
            }

            if(dto.employees) {
                await service.$set('employees', []);

                const employees: number[] = JSON.parse(dto.employees);

                employees.forEach(async (item_id) => {
                    const employee = await this.employeeService.getOne(item_id);
                    await service.$add('employees', employee);
                })
            }

            return service;
        } catch (error) {
            console.log(error);
            throw new HttpException('Ошибка при обновлении услуги', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async remove(id: number) {
        try {
            const service = await this.serviceRepository.findByPk(id);
            if(!service) throw new HttpException('Услуга не найдена! Ошибка при удалении услуги', HttpStatus.NOT_FOUND);

            await this.fileService.remove(service.image, FileTypesEnum.image);

            if(service.documents.length) {
                service.documents.forEach(async (item) => {
                    await this.documentService.remove(item.id);
                })
            } else {
                return await this.serviceRepository.destroy({where:{id}}); 
            }
        } catch (error) {
            console.log(error);
            throw new HttpException('Ошибка при удалении услуги', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getOne(id: number) {
        try {
            return await this.serviceRepository.findByPk(id, {include: {all: true}});
        } catch (error) {
            console.log(error);
            throw new HttpException('Ошибка при получении услуги', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAll() {
        try {
            return await this.serviceRepository.findAll({include: {all: true}});
        } catch (error) {
            console.log(error);
            throw new HttpException('Ошибка при получении услуг', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
