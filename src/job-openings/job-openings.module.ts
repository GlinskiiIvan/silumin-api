import { Module } from '@nestjs/common';
import { JobOpeningsController } from './job-openings.controller';
import { JobOpeningsService } from './job-openings.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { JobOpening } from './job-openings.model';
import { DutiesModule } from 'src/duties/duties.module';
import { JobOpeningRequirement } from './job-openings-requirements.model';
import { RequirementsModule } from 'src/requirements/requirements.module';

@Module({
  controllers: [JobOpeningsController],
  providers: [JobOpeningsService],
  imports: [
    SequelizeModule.forFeature([JobOpening, JobOpeningRequirement]),
    DutiesModule,
    RequirementsModule
  ]
})
export class JobOpeningsModule {}
