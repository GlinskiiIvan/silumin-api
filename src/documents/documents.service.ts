import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDocumentDto } from './dto/create-document.dto';
import { Document } from './documents.model'
import { FilesService } from 'src/files/files.service';
import { FileTypesEnum } from 'src/enums/file-types.enum';


@Injectable()
export class DocumentsService {
    constructor(@InjectModel(Document) private documentRepository: typeof Document,
    private fileService: FilesService){};

    async create(dto: CreateDocumentDto, file) {
        try {
            const fileName = await this.fileService.create(file, FileTypesEnum.document);
            const document = await this.documentRepository.create({...dto, document: fileName});
            return document;
        } catch (error) {
            console.log(error);
            throw new HttpException('Ошибка при создании документа', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async remove(id: number) {
        const candidate = await this.documentRepository.findByPk(id);
        if(!candidate) throw new HttpException('Документ не найден. Ошибка при удалении файла', HttpStatus.NOT_FOUND);

        return await this.documentRepository.destroy({where:{id}});
    }

    async getOne(id: number) {
        return await this.documentRepository.findByPk(id);
    }

    async getAll() {
        return await this.documentRepository.findAll();
    }
}