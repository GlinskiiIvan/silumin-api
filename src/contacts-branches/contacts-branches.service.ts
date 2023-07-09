import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ContactBranche } from './contacts-branches.model';
import { ContactsService } from 'src/contacts/contacts.service';
import { InjectModel } from '@nestjs/sequelize';
import { CreateContactBrancheDto } from './dto/create-contacts-branches.dto';
import { UpdateContactBrancheDto } from './dto/update-contacts-branches.dto';

import {IContactParsed} from "../employees/employees.service";
import {Contact} from "../contacts/contacts.model";

@Injectable()
export class ContactsBranchesService {
    constructor(@InjectModel(ContactBranche) private contactBrancheRepository: typeof ContactBranche,
    private contactService: ContactsService) {};

    async create(dto: CreateContactBrancheDto) {
        const candidate = await this.contactBrancheRepository.findOne(
            {where:
                {
                    city: dto.city, 
                    name: dto.name,
                }
            });
        if(candidate) throw new HttpException('Филиал уже существует! Ошибка при создании филиала', HttpStatus.BAD_REQUEST);

        const {contacts, ...mainProps} = dto;
        const contactBranche = await this.contactBrancheRepository.create(mainProps);

        if(contacts) {
            const contactsParsed: IContactParsed[] = JSON.parse(contacts);
            contactsParsed.forEach(async (item) => {
                await this.contactService.create({...item, contact_branche_id: contactBranche.id});
            })
        }

        return contactBranche;
    }

    async update(id: number, dto: UpdateContactBrancheDto) {
        const candidate = await this.contactBrancheRepository.findByPk(id, {
            attributes: ['id', 'city', 'name', 'address'],
            include: [
                {model: Contact, as: 'contacts', attributes: ['id', 'value', 'type']},
            ],
        });
        if(!candidate) throw new HttpException('Фимлиал не найден! Ошибка при обновлении', HttpStatus.NOT_FOUND);

        const {contacts, ...mainProps} = dto;
        const contactBranche = await this.contactBrancheRepository.update(mainProps, {where:{id}});

        if(contacts) {
            candidate.contacts.map(async (item) => {
                await this.contactService.remove(item.id);
            })

            const contactsParsed: IContactParsed[] = JSON.parse(contacts);
            contactsParsed.forEach(async (item) => {
                await this.contactService.create({...item, contact_branche_id: id});
            })
        }

        return contactBranche;
    }

    async remove(id: number) {
        const candidate = await this.contactBrancheRepository.findByPk(id);
        if(!candidate) throw new HttpException('Филиал не найден! Ошибка при удалении', HttpStatus.NOT_FOUND);

        return await this.contactBrancheRepository.destroy({where:{id}});
    }

    async getOne(id: number) {
        return await this.contactBrancheRepository.findByPk(id, {
            attributes: ['id', 'city', 'name', 'address'],
            include: [
                {model: Contact, as: 'contacts', attributes: ['id', 'value', 'type']},
            ],
        });
    }

    async getAll() {
        return await this.contactBrancheRepository.findAll({
            attributes: ['id', 'city', 'name', 'address'],
        });
    }
}
