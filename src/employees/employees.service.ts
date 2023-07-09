import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from './employees.model';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ContactsService } from 'src/contacts/contacts.service';
import {Role} from "../roles/roles.model";
import {Contact} from "../contacts/contacts.model";

export interface IContactParsed {
    value: string,
    type: string
}

@Injectable()
export class EmployeesService {
    constructor(@InjectModel(Employee) private employeeRepository: typeof Employee,
    private contactService: ContactsService) {};

    async create(dto: CreateEmployeeDto) {
        const candidate = await this.employeeRepository.findOne(
            {where:
                {
                    last_name: dto.last_name, 
                    first_name: dto.first_name, 
                    patronymic: dto.patronymic
                }
            });
        if(candidate) throw new HttpException('Сотрудник с таким ФИО уже существует! Ошибка при создании сотрудника', HttpStatus.BAD_REQUEST);

        const {contacts, ...mainProps} = dto;
        const employee = await this.employeeRepository.create(mainProps);

        if(contacts) {
            const contactsParsed: IContactParsed[] = JSON.parse(contacts);
            contactsParsed.forEach(async (item) => {
                await this.contactService.create({...item, employee_id: employee.id});
            })
        }

        return employee;
    }

    async update(id: number, dto: UpdateEmployeeDto) {
        const candidate = await this.employeeRepository.findByPk(id, {
            attributes: ['last_name', 'first_name', 'patronymic', 'position'],
            include: [
                {model: Contact, as: 'contacts', attributes: ['id', 'value', 'type']},
            ],
        });
        if(!candidate) throw new HttpException('Сотрудник не найден! Ошибка при обновлении', HttpStatus.NOT_FOUND);

        const {contacts, ...mainProps} = dto;
        const employee = await this.employeeRepository.update(mainProps, {where:{id}});

        if(contacts) {
            candidate.contacts.map(async (item) => {
                await this.contactService.remove(item.id);
            })

            const contactsParsed: IContactParsed[] = JSON.parse(contacts);
            contactsParsed.forEach(async (item) => {
                await this.contactService.create({...item, employee_id: id});
            })
        }

        return employee;
    }

    async remove(id: number) {
        const candidate = await this.employeeRepository.findByPk(id);
        if(!candidate) throw new HttpException('Сотрудник не найден! Ошибка при удалении', HttpStatus.NOT_FOUND);

        return await this.employeeRepository.destroy({where:{id}});
    }

    async getOne(id: number) {
        return await this.employeeRepository.findByPk(id, {
            attributes: ['id', 'last_name', 'first_name', 'patronymic', 'position'],
            include: [
                {model: Contact, as: 'contacts', attributes: ['value', 'type']},
            ],
        });
    }

    async getAll() {
        return await this.employeeRepository.findAll({
            attributes: ['id', 'last_name', 'first_name', 'patronymic', 'position'],
        });
    }
}
