import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Duty } from './duties.model';
import { CreateDutyDto } from './dto/duties.dto';

@Injectable()
export class DutiesService {
    constructor(@InjectModel(Duty) private dutyRepository: typeof Duty) {};

    async create(dto: CreateDutyDto) {
        try {
            return await this.dutyRepository.create(dto);            
        } catch (error) {
            console.log(error);
            throw new HttpException('Ошибка при создании обязанности.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async remove(id: number) {
        const candidate = await this.dutyRepository.findByPk(id);
        if(!candidate) throw new HttpException('Обязанность с таким значением не найдена! Ошибка при удалении обязанности.', HttpStatus.NOT_FOUND);

        return await this.dutyRepository.destroy({where:{id}});
    }

    async getOne(id: number) {
        const candidate = await this.dutyRepository.findByPk(id);
        if(!candidate) throw new HttpException('Обязанность с таким значением не найдена!', HttpStatus.NOT_FOUND);

        return await this.dutyRepository.findByPk(id);
    }

    async getAll() {
        return await this.dutyRepository.findAll();
    }
}
