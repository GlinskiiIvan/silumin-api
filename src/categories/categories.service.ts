import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './categories.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ProductsService } from 'src/products/products.service';
import { ServicesService } from 'src/services/services.service';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(Category) private categoryRepository: typeof Category,
        private productService: ProductsService,
        private serviceService: ServicesService,
    ) {};

    async create(dto: CreateCategoryDto) {
        try {
            const {name} = dto;
            const candidate = await this.categoryRepository.findOne({where:{name}})
            if(candidate) throw new HttpException('Категория с таким именем уже существует! Ошибка при создании категории', HttpStatus.BAD_REQUEST);

            const category = await this.categoryRepository.create({name});

            if(dto.products) {
                category.$set('products', []);
                const productsParsed: number[] = JSON.parse(dto.products);
                if(productsParsed.length) {
                    productsParsed.forEach(async (item_id) => {
                        const product = await this.productService.getOne(item_id);
                        await category.$add('products', product);
                    })
                }
            }

            if(dto.services) {
                category.$set('services', []);
                const servicesParsed: number[] = JSON.parse(dto.services);
                if(servicesParsed.length) {
                    servicesParsed.forEach(async (item_id) => {
                        const service = await this.serviceService.getOne(item_id);
                        await category.$add('services', service);
                    })
                }
            }

            return category;
        } catch (error) {
            console.log(error);
            throw new HttpException('Ошибка при создании категории', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: number, dto: UpdateCategoryDto) {
        try {
            const category = await this.categoryRepository.findByPk(id);
            if(!category) throw new HttpException('Категория с таким именем не найдена! Ошибка при обновлении категории', HttpStatus.NOT_FOUND);

            const {name} = dto;
            await this.categoryRepository.update({name}, {where:{id}});

            if(dto.products) {
                category.$set('products', []);
                const productsParsed: number[] = JSON.parse(dto.products);
                if(productsParsed.length) {
                    productsParsed.forEach(async (item_id) => {
                        const product = await this.productService.getOne(item_id);
                        await category.$add('products', product);
                    })
                }
            }

            if(dto.services) {
                category.$set('services', []);
                const servicesParsed: number[] = JSON.parse(dto.services);
                if(servicesParsed.length) {
                    servicesParsed.forEach(async (item_id) => {
                        const service = await this.serviceService.getOne(item_id);
                        await category.$add('services', service);
                    })
                }
            }
        } catch (error) {
            console.log(error);
            throw new HttpException('Ошибка при обновлении категории', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async remove(id: number) {
        try {
            const category = await this.categoryRepository.findByPk(id);
            if(!category) throw new HttpException('Категория с таким именем не найдена! Ошибка при удалении категории', HttpStatus.NOT_FOUND);

            return await this.categoryRepository.destroy({where:{id}});
        } catch (error) {
            console.log(error);
            throw new HttpException('Ошибка при удалении категории', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getOne(id: number) {
        try {
            return await this.categoryRepository.findByPk(id, {include: {all: true}});
        } catch (error) {
            console.log(error);
            throw new HttpException('Ошибка при получении категории', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAll() {
        try {
            return await this.categoryRepository.findAll({include: {all: true}});
        } catch (error) {
            console.log(error);
            throw new HttpException('Ошибка при получении категорий', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
