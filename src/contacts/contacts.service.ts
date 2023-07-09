import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Contact } from './contacts.model';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactsService {
    constructor(@InjectModel(Contact) private contactRepository: typeof Contact) {};

    async create(dto: CreateContactDto) {
        try {
            return await this.contactRepository.create(dto);
        } catch (error) {
            console.log(error);
            
        }
    }

    async remove(id: number) {
        const candidate = await this.contactRepository.findByPk(id);
        if(!candidate) throw new HttpException('Контакт не найден! Ошибка при удалении контакта', HttpStatus.NOT_FOUND);

        return await this.contactRepository.destroy({where:{id}});
    }

    async getOne(id: number) {
        return await this.contactRepository.findByPk(id);
    }

    async getOneByValue(value: string) {
        return await this.contactRepository.findOne({where: {value}});
    }

    async getAll() {
        return await this.contactRepository.findAll();
    }
}
