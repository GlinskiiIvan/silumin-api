import { Module } from '@nestjs/common';
import { SpecificationsService } from './specifications.service';
import { Specification } from './specifications.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [SpecificationsService],
  imports: [
    SequelizeModule.forFeature([Specification]),
  ],
  exports: [
    SpecificationsService
  ]
})
export class SpecificationsModule {}
