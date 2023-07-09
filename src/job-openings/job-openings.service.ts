import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JobOpening } from './job-openings.model';
import { CreateJobOpeningDto } from './dto/create-job-openings.dto';
import { UpdateJobOpeningDto } from './dto/update-job-openings.dto';
import { DutiesService } from 'src/duties/duties.service';
import { RequirementsService } from 'src/requirements/requirements.service';
import { Requirement } from 'src/requirements/requirements.model';
import { Duty } from 'src/duties/duties.model';
import it from "node:test";

@Injectable()
export class JobOpeningsService {
    constructor(
        @InjectModel(JobOpening) private jobOpeningRepository: typeof JobOpening, 
        private dutyService: DutiesService,
        private requirementService: RequirementsService
    ) {};

    async create(dto: CreateJobOpeningDto) {
        const candidate = await this.jobOpeningRepository.findOne({where:{name: dto.name}});
        if(candidate) throw new HttpException('Вакансия с таким названием уже существует! Ошибка при создании вакансии.', HttpStatus.BAD_REQUEST);

        try {    
            const {name, description} = dto;
            const jobOpening = await this.jobOpeningRepository.create({name, description});        
            
            if(dto.requirements) {
                const requirements: string[] = JSON.parse(dto.requirements);
                if(requirements.length) {
                    await jobOpening.$set('requirements', []);
                    requirements.forEach(async (item) => {
                        const requirement = await this.requirementService.getOneByValue(item);
                        await jobOpening.$add('requirements', requirement);
                    })
                }
            }
    
            if(dto.duties) {
                const duties: string[] = JSON.parse(dto.duties);
                if(duties.length) {
                    duties.forEach(async (duty) => {
                        await this.dutyService.create({value: duty, job_opening_id: jobOpening.id})
                    })
                }            
            }
     
            return jobOpening;            
        } catch (error) {
            console.log(error);
            throw new HttpException(`Ошибка при создании вакансии. ${error.message}`, error.satatus);
        }
    }

    async update(id: number, dto: UpdateJobOpeningDto) {
        const jobOpening = await this.jobOpeningRepository.findByPk(id, {
            attributes: ['id', 'name', 'description'],
            include: [
                {model: Requirement, as: 'requirements', attributes: ['id', 'value'], through: {attributes: []}},
                {model: Duty, as: 'duties', attributes: ['id', 'value']},
            ],
        });
        if(!jobOpening) throw new HttpException('Вакансия с таким названием не найдена! Ошибка при обновлении вакансии.', HttpStatus.NOT_FOUND);

        if(dto.name) {
            const candidate = await this.jobOpeningRepository.findOne({where:{name: dto.name}});
            if(candidate && candidate.name !== dto.name) throw new HttpException('Вакансия с таким названием уже существует! Ошибка при обновлении вакансии.', HttpStatus.BAD_REQUEST);
        }

        try {
            const {name, description} = dto;
            await this.jobOpeningRepository.update({name, description}, {where:{id}});

            if(dto.requirements) {
                const requirements: string[] = JSON.parse(dto.requirements);
                if(requirements.length) {
                    await jobOpening.$set('requirements', []);
                    requirements.forEach(async (item) => {
                        const requirement = await this.requirementService.getOneByValue(item);
                        await jobOpening.$add('requirements', requirement);
                    })
                }
            }
            if(dto.duties) {
                if(jobOpening.duties.length) {
                    jobOpening.duties.forEach(async (item) => {
                        await  this.dutyService.remove(item.id);
                    })
                }

                const dutiesParsed: string[] = JSON.parse(dto.duties);
                if(dutiesParsed.length) {
                    dutiesParsed.forEach(async (duty) => {
                        await this.dutyService.create({value: duty, job_opening_id: jobOpening.id})
                    })
                }
            }
    
            return jobOpening;            
        } catch (error) {
            console.log(error);
            throw new HttpException(`Ошибка при обновлении вакансии. ${error.message}`, error.satatus);            
        }
    }

    async remove(id: number) {
        const jobOpening = await this.jobOpeningRepository.findByPk(id, {include: {all: true}});
        if(!jobOpening) throw new HttpException('Вакансия с таким названием не найдена! Ошибка при удалении вакансии.', HttpStatus.NOT_FOUND);

        return await this.jobOpeningRepository.destroy({where:{id}});
    }

    async getOne(id: number) {
        const jobOpening = await this.jobOpeningRepository.findByPk(id, {include: {all: true}});
        if(!jobOpening) throw new HttpException('Вакансия с таким названием не найдена!', HttpStatus.NOT_FOUND);

        return await this.jobOpeningRepository.findByPk(id, {
            attributes: ['id', 'name', 'description'],
            include: [
                {model: Requirement, as: 'requirements', attributes: ['id', 'value'], through: {attributes: []}},
                {model: Duty, as: 'duties', attributes: ['id', 'value']},
            ],
        });
    }

    async getAll() {
        return await this.jobOpeningRepository.findAll({
            attributes: ['id', 'name', 'description']
        });
    }
}