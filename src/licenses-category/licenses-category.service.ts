import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LicensesCategory } from './licenses-category.model';
import { CreateLicensesCategoryDto } from './dto/create-licenses-category.dto';
import { UpdateLicensesCategoryDto } from './dto/update-licenses-category.dto';
import { LicensesService } from 'src/licenses/licenses.service';
import {Role} from "../roles/roles.model";
import {Licenses} from "../licenses/licenses.model";

@Injectable()
export class LicensesCategoryService {
    constructor(
        @InjectModel(LicensesCategory) private licensesCategoryRepository: typeof LicensesCategory,
        private licensesService: LicensesService
    ) {};

    async create(dto: CreateLicensesCategoryDto, images) {
        const candidate = await this.licensesCategoryRepository.findOne({where: {name: dto.name}});
        if(candidate) throw new HttpException('Категория с таким именем уже существует! Ошибка при создании категории', HttpStatus.BAD_REQUEST);

        try {
            const category = await this.licensesCategoryRepository.create(dto);
            category.$set('licenses', []);

            if(images) {
                images.forEach(async (file) => {
                    await this.licensesService.create({licenses_category_id: category.id}, file);
                })
            }

            return category;    
        } catch (error) {
            console.log(error);
            throw new HttpException(`Ошибка при создании категории. ${error.message}`, error.status);
        }
    }

    async update(id: number, dto: UpdateLicensesCategoryDto, images) {
        let category = await this.licensesCategoryRepository.findByPk(id);
        if(!category) throw new HttpException('Категория не найдена! Ошибка при обновлении категории.', HttpStatus.NOT_FOUND);

        if(dto.name) {
            const candidate = await this.licensesCategoryRepository.findOne({where: {name: dto.name}});
            if(candidate && candidate.name !== dto.name) throw new HttpException('Категория с таким именем уже существует! Ошибка при обновлении категории.', HttpStatus.BAD_REQUEST);
        }

        try {
            if(dto.licenses_remove) {
                const licensesRemove: number[] = JSON.parse(dto.licenses_remove);
                if(licensesRemove.length) {
                    licensesRemove.forEach(async (item_id) => {
                        await this.licensesService.remove(item_id);
                    })
                }
            }

            if(images) {
                images.forEach(async (file) => {
                    await this.licensesService.create({licenses_category_id: id}, file);
                })
            }

            return await this.licensesCategoryRepository.update(dto, {where: {id}});
        } catch (error) {
            console.log(error);
            throw new HttpException(`Ошибка при обновлении категории. ${error.message}`, error.status);
        }
    }

    async remove(id: number) {
        const category = await this.licensesCategoryRepository.findByPk(id, {include: ['licenses']});
        if(!category) throw new HttpException('Категория не найдена! Ошибка при удалении категории.', HttpStatus.NOT_FOUND);
        
        try {
            for (let index = 0; index < category.licenses.length; index++) {
                await this.licensesService.remove(category.licenses[index].id);  
            }

            return await this.licensesCategoryRepository.destroy({where:{id}});
        } catch (error) {
            console.log(error);
            throw new HttpException(`Ошибка при удалении категории. ${error.message}`, error.status);
        }
    }

    async getOne(id: number) {
        const category = await this.licensesCategoryRepository.findByPk(id, {
            attributes: ['id', 'name'],
            include: [
                {model: Licenses, as: 'licenses', attributes: ['id', 'image']},
            ],
        });
        if(!category) throw new HttpException('Категория не найдена!', HttpStatus.NOT_FOUND);

        try {
            return category;    
        } catch (error) {
            console.log(error);
            throw new HttpException('', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAll() {
        try {
            return await this.licensesCategoryRepository.findAll({attributes: ['id', 'name']});
        } catch (error) {
            console.log(error);
            throw new HttpException('', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
