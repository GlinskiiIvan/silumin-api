import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Specification } from './specifications.model';
import { CreateSpecificationDto } from './dto/create-specification.dto';

@Injectable()
export class SpecificationsService {
    constructor(@InjectModel(Specification) private specificationRepository: typeof Specification) {};

    async create(dto: CreateSpecificationDto) {
        return await this.specificationRepository.create(dto);
    }

    async remove(id: number) {
        const candidate = await this.specificationRepository.findByPk(id);
        if(!candidate) throw new HttpException('Характеристика не найдена. Ошибка при удалении характеристики', HttpStatus.NOT_FOUND);

        return await this.specificationRepository.destroy({where:{id}});
    }

    async getOne(id: number) {
        return await this.specificationRepository.findByPk(id);
    }

    async getAll() {
        return await this.specificationRepository.findAll();
    }
}
