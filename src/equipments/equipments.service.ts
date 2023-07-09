import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Equipment } from './equipments.model';
import { FilesService } from 'src/files/files.service';
import { FileTypesEnum } from 'src/enums/file-types.enum';
import { DocumentsService } from 'src/documents/documents.service';
import { SpecificationsService } from 'src/specifications/specifications.service';
import { EmployeesService } from 'src/employees/employees.service';

interface ISpecification {
    name: string;
    value: string;
}

@Injectable()
export class EquipmentsService {
    constructor(
        @InjectModel(Equipment) private equipmentRepository: typeof Equipment,
        private fileService: FilesService,
        private documentServise: DocumentsService, 
        private specificationService: SpecificationsService,
        private employeeService: EmployeesService
    ) {}

    async create(dto: CreateEquipmentDto, documents, image) {
        const candidate = await this.equipmentRepository.findOne({where:{title:dto.title}});
        if(candidate) throw new HttpException('Такое оборудование уже добавлено', HttpStatus.BAD_REQUEST);

        const {employees, specifications, documents_names, ...otherProps} = dto;

        // изоброжение
        const fileName = await this.fileService.create(image[0], FileTypesEnum.image);

        const equipment = await this.equipmentRepository.create({...otherProps, image: fileName});

        // сотрудники - контакты сотрудников
        if(employees) {
            await equipment.$set('employees', []);

            const employees: number[] = JSON.parse(dto.employees);

            employees.forEach(async (item_id) => {
                const employee = await this.employeeService.getOne(item_id);
                await equipment.$add('employees', employee);
            })            
        }

        // документы
        if(documents && documents_names) {
            const documentsNamesParsed: string[] = JSON.parse(documents_names);
            documents.forEach(async (item, index) => {
                await this.documentServise.create({equipment_id: equipment.id, name: documentsNamesParsed[index]}, item);
            });
        }

        // характеристики
        if(specifications) {
            const specificationsParsed: ISpecification[] = JSON.parse(specifications);
            specificationsParsed.forEach(async (item) => {
                await this.specificationService.create({...item, equipment_id: equipment.id});
            })
        }

        return equipment;
    }

    async update(id: number, dto: UpdateEquipmentDto, documents, image) {
        const equipment = await this.equipmentRepository.findByPk(id, {include: ['contact_block']});
        if(!equipment) throw new HttpException('Оборудование не найдено. Ошибка при обновлении.', HttpStatus.NOT_FOUND);

        const {employees, documents_names, documents_remove, specifications_add, specifications_remove, ...otherProps} = dto;

        // сотрудники - контакты сотрудников
        if(employees) {
            await equipment.$set('employees', []);

            const employees: number[] = JSON.parse(dto.employees);

            employees.forEach(async (item_id) => {
                const employee = await this.employeeService.getOne(item_id);
                await equipment.$add('employees', employee);
            })
        }

        // изоброжение
        if(image) {
            await this.fileService.remove(equipment.image, FileTypesEnum.image);
            const fileName = await this.fileService.create(image[0], FileTypesEnum.image);
            await this.equipmentRepository.update({image: fileName}, {where:{id}});
        }

        // документы
        if(documents && documents_names) {
            const documentsNamesParsed: string[] = JSON.parse(documents_names);
            documents.forEach(async (item, index) => {
                await this.documentServise.create({equipment_id: equipment.id, name: documentsNamesParsed[index]}, item);
            });
        }

        if(documents_remove) {
            const documentsRemoveParsed: number[] = JSON.parse(documents_remove);
            documentsRemoveParsed.forEach(async (item_id) => {
                await this.documentServise.remove(item_id);
            })
        }

        // характеристики
        if(specifications_add) {
            const specificationsAddParsed: ISpecification[] = JSON.parse(specifications_add);
            specificationsAddParsed.forEach(async (item) => {
                await this.specificationService.create({...item, equipment_id: id});
            })
        }

        if(specifications_remove) {
            const specificationsRemoveParsed: number[] = JSON.parse(specifications_remove);
            specificationsRemoveParsed.forEach(async (item_id) => {
                await this.specificationService.remove(item_id);
            })
        }

        return await this.equipmentRepository.update(otherProps, {where:{id}})
    }

    async remove(id: number) {
        const equipment = await this.equipmentRepository.findByPk(id);
        if(!equipment) throw new HttpException('Оборудование не найдено. Ошибка при удалении.', HttpStatus.NOT_FOUND);

        await this.fileService.remove(equipment.image, FileTypesEnum.image);

        if(equipment.documents.length) {
            equipment.documents.forEach(async (item) => {
                await this.documentServise.remove(item.id);
            })
        } else {
            return await this.equipmentRepository.destroy({where:{id}});
        }        
    }

    async getOne(id: number) {
        return await this.equipmentRepository.findByPk(id, {include: {all: true}})
    }

    async getAll() {
        return await this.equipmentRepository.findAll({include: {all: true}});
    }
}
