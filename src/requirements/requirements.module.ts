import { Module } from '@nestjs/common';
import { RequirementsService } from './requirements.service';
import { Requirement } from './requirements.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { RequirementsController } from './requirements.controller';

@Module({
  providers: [RequirementsService],
  imports: [
    SequelizeModule.forFeature([Requirement]),
  ],
  exports: [
    RequirementsService
  ],
  controllers: [RequirementsController]
})
export class RequirementsModule {}
