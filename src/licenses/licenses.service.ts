import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Licenses } from './licenses.model';
import { CreateLicensesDto } from './dto/create-licenses.dto';
import { FilesService } from 'src/files/files.service';
import { FileTypesEnum } from 'src/enums/file-types.enum';

@Injectable()
export class LicensesService {
    constructor(
        @InjectModel(Licenses) private licensesRepository: typeof Licenses,
        private fileService: FilesService
    ) {};

    async create(dto: CreateLicensesDto, image) {
        try {
            const fileName = await this.fileService.create(image, FileTypesEnum.image);
            const licenses = await this.licensesRepository.create({...dto, image: fileName});
            return licenses;    
        } catch (error) {
            console.log(error);
            throw new HttpException(`Ошибка при создании лицензии. ${error.message}`, error.status);
        }        
    }

    async remove(id: number) {
        const candidate = await this.licensesRepository.findByPk(id);
        if(!candidate) throw new HttpException('Лицензия не найдена! Ошибка при удалении лицензии.', HttpStatus.NOT_FOUND);

        try {
            await this.fileService.remove(candidate.image, FileTypesEnum.image);

            return await this.licensesRepository.destroy({where:{id}});    
        } catch (error) {
            console.log(error);
            throw new HttpException(`Ошибка при удалении лицензии. ${error.message}`, error.status);
        }        
    }

    async getOne(id: number) {
        const license = await this.licensesRepository.findByPk(id);
        if(!license) throw new HttpException('Лицензия не найдена.', HttpStatus.NOT_FOUND);

        return license;
    }

    async getAll() {
        return await this.licensesRepository.findAll();
    }
}
