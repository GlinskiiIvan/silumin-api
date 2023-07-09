import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './products.model';
import { EquipmentsService } from 'src/equipments/equipments.service';
import { EmployeesService } from 'src/employees/employees.service';
import { DocumentsService } from 'src/documents/documents.service';
import { FilesService } from 'src/files/files.service';
import { FileTypesEnum } from 'src/enums/file-types.enum';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product) private productRepository: typeof Product,
        private fileService: FilesService,
        private documentService: DocumentsService,
        private employeeService: EmployeesService,
        private equipmentService: EquipmentsService        
    ) {};

    async create(dto: CreateProductDto, documents, image) {
        try {
            const {title, content} = dto;
            const candidate = await this.productRepository.findOne({where:{title}})
            if(candidate) throw new HttpException('Продукция с таким названием уже существует! Ошибка при создании продукции', HttpStatus.BAD_REQUEST);

            const fileName = await this.fileService.create(image[0], FileTypesEnum.image);
            const product = await this.productRepository.create({title, content, image: fileName});

            if(documents && dto.documents_names) {
                const documentsNames: string[] = JSON.parse(dto.documents_names);

                documents.forEach(async (item, index) => {
                    await this.documentService.create({name: documentsNames[index], product_id: product.id}, item);
                })
            }

            if(dto.employees) {
                await product.$set('employees', []);

                const employees: number[] = JSON.parse(dto.employees);

                employees.forEach(async (item_id) => {
                    const employee = await this.employeeService.getOne(item_id);
                    await product.$add('employees', employee);
                })
            }

            if(dto.equipments) {
                await product.$set('equipments', []);

                const equipments: number[] = JSON.parse(dto.equipments);

                equipments.forEach(async (item_id) => {
                    const equipment = await this.equipmentService.getOne(item_id);
                    await product.$add('equipments', equipment);
                })
            }

            return product;
        } catch (error) {
            console.log(error);
            throw new HttpException('Ошибка при создании продукции', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: number, dto: UpdateProductDto, documents, image) {
        try {
            const product = await this.productRepository.findByPk(id);
            if(!product) throw new HttpException('Продукция не найдена! Ошибка при обновлении продукции', HttpStatus.NOT_FOUND);

            const {title, content} = dto;
            await this.productRepository.update({title, content}, {where:{id}});

            if(image) {
                await this.fileService.remove(product.image, FileTypesEnum.image);
                const fileName = await this.fileService.create(image[0], FileTypesEnum.image);
                await this.productRepository.update({image: fileName}, {where:{id}});
            }

            if(documents && dto.documents_names) {
                const documentsNames: string[] = JSON.parse(dto.documents_names);

                documents.forEach(async (item, index) => {
                    await this.documentService.create({name: documentsNames[index], product_id: product.id}, item);
                })
            }

            if(dto.documents_remove) {
                const documentsRemove: number[] = JSON.parse(dto.documents_remove);

                documentsRemove.forEach(async (item_id) => {
                    await this.documentService.remove(item_id);
                })
            }

            if(dto.employees) {
                await product.$set('employees', []);

                const employees: number[] = JSON.parse(dto.employees);

                employees.forEach(async (item_id) => {
                    const employee = await this.employeeService.getOne(item_id);
                    await product.$add('employees', employee);
                })
            }

            if(dto.equipments) {
                await product.$set('equipments', []);

                const equipments: number[] = JSON.parse(dto.equipments);

                equipments.forEach(async (item_id) => {
                    const equipment = await this.equipmentService.getOne(item_id);
                    await product.$add('equipments', equipment);
                })
            }

            return product;
        } catch (error) {
            console.log(error);
            throw new HttpException('Ошибка при обновлении продукции', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async remove(id: number) {
        try {
            const product = await this.productRepository.findByPk(id);
            if(!product) throw new HttpException('Продукция не найдена! Ошибка при удалении продукции', HttpStatus.NOT_FOUND);

            await this.fileService.remove(product.image, FileTypesEnum.image);

            if(product.documents.length) {
                product.documents.forEach(async (item) => {
                    await this.documentService.remove(item.id);
                })
            } else {
                return await this.productRepository.destroy({where:{id}}); 
            }        
        } catch (error) {
            console.log(error);
            throw new HttpException('Ошибка при удалении продукции', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getOne(id: number) {
        try {
            return this.productRepository.findByPk(id, {include: {all: true}});
        } catch (error) {
            console.log(error);
            throw new HttpException('Ошибка при получении продукции', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAll() {
        try {
            return this.productRepository.findAll({include: {all: true}});
        } catch (error) {
            console.log(error);
            throw new HttpException('Ошибка при получении всех продукций', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
