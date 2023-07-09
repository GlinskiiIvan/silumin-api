import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { InjectModel } from '@nestjs/sequelize';
import { News } from './news.model';
import { FilesService } from 'src/files/files.service';
import { UpdateNewsDto } from './dto/update-news.dto';
import { FileTypesEnum } from 'src/enums/file-types.enum';

@Injectable()
export class NewsService {
    constructor(
        @InjectModel(News) private newsRepository: typeof News,
        private filesService: FilesService
    ) {};

    async create(dto: CreateNewsDto, image) {
        const candidate = await this.newsRepository.findOne({where: {title: dto.title}});
        if(candidate) throw new HttpException('Новость с таким заголовком уже существует! Ошибка при создании новости.', HttpStatus.BAD_REQUEST);
        
        try {
            const fileName = await this.filesService.create(image, FileTypesEnum.image);
            return await this.newsRepository.create({...dto, image: fileName}); 
        } catch (error) {
            console.log(error);
            throw new HttpException(`Ошибка при создании новости. ${error.message}`, error.status);
        }
    }


    async update(dto: UpdateNewsDto, id: number, image) {   
        if(dto.title) {
            const news = await this.newsRepository.findOne({where: {title: dto.title}});
            if(news && news.title !== dto.title) throw new HttpException('Новость с таким заголовком уже существует! Ошибка при обновлении новости.', HttpStatus.BAD_REQUEST);
        }
        
        try {            
            const news = await this.newsRepository.findByPk(id);

            await this.newsRepository.update(dto, {where: {id}}); 

            if(image) {
                await this.filesService.remove(news.image, FileTypesEnum.image);
                const fileName = await this.filesService.create(image, FileTypesEnum.image);
                await this.newsRepository.update({image: fileName}, {where: {id}}); 
            }

            return news;
        } catch (error) {
            console.log(error);
            throw new HttpException(`Ошибка при обновлении новости. ${error.message}`, error.status);
        }             
    }

    async remove(id: number) {
        const news = await this.newsRepository.findByPk(id);
        if(!news) throw new HttpException('Новость не найдена! Ошибка при удалении новости.', HttpStatus.BAD_REQUEST);
        
        try {
            await this.filesService.remove(news.image, FileTypesEnum.image);

            return await this.newsRepository.destroy({where: {id}});    
        } catch (error) {
            console.log(error);
            throw new HttpException(`Ошибка при удалении новости. ${error.message}`, error.status);
        }
    } 


    async getOne(id: number) {
        try {
            return await this.newsRepository.findByPk(id);    
        } catch (error) {
            console.log(error);
            throw new HttpException('Ошибка при получении новости.', HttpStatus.INTERNAL_SERVER_ERROR);
        }        
    }


    async getAll() {
        try {
            return await this.newsRepository.findAll({
                attributes: ['id', 'title', 'sub_title', 'date', 'image']
            });
        } catch (error) {
            console.log(error);
            throw new HttpException('Ошибка при получении всех новостей.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
