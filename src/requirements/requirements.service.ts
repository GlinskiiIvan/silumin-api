import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Requirement } from './requirements.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRequirementDto } from './dto/create-requirement.dto';
import { UpdateRequirementDto } from './dto/update-requirement.dto';

@Injectable()
export class RequirementsService {
    constructor(@InjectModel(Requirement) private requirementRepository: typeof Requirement) {};

    async create(dto: CreateRequirementDto) {
        const candidate = await this.requirementRepository.findOne({where:{value: dto.value}});
        if(candidate) throw new HttpException('Требование уже существует! Ошибка при создании требования.', HttpStatus.BAD_REQUEST);

        try {
            return await this.requirementRepository.create(dto);
        } catch (error) {
            console.log(error);
            throw new HttpException('Ошибка при создании требования!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: number, dto: UpdateRequirementDto) {
        const requirement = await this.requirementRepository.findByPk(id);
        if(!requirement) throw new HttpException('Требование с таким значением не найдено! Ошибка при обновлении требования.', HttpStatus.NOT_FOUND);
        
        try {
            await this.requirementRepository.update(dto, {where:{id}});
            return requirement;
        } catch (error) {
            console.log(error);
            throw new HttpException('Ошибка при обновлении требования.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async remove(id: number) {
        const candidate = await this.requirementRepository.findByPk(id);
        if(!candidate) throw new HttpException('Требование не найдено! Ошибка при удалении требования.', HttpStatus.NOT_FOUND);
        
        try {
            return await this.requirementRepository.destroy({where:{id}});
        } catch (error) {
            console.log(error);
            throw new HttpException('Ошибка при удалении требования!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getOne(id: number) {
        const candidate = await this.requirementRepository.findByPk(id);
        if(!candidate) throw new HttpException('Требование не найдено!', HttpStatus.NOT_FOUND);

        try {
            return candidate;
        } catch (error) {
            console.log(error);
            throw new HttpException('Ошибка при получении требования!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getOneByValue(value: string) {
        const candidate = await this.requirementRepository.findOne({where:{value}});
        if(!candidate) throw new HttpException('Требование не найдено!', HttpStatus.NOT_FOUND);

        try {
            return candidate;
        } catch (error) {
            console.log(error);
            throw new HttpException('Ошибка при получении требования!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAll() {
        return await this.requirementRepository.findAll();
    }
}