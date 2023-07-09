import { Module } from '@nestjs/common';
import { DutiesService } from './duties.service';
import { Duty } from './duties.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [DutiesService],
  imports: [
    SequelizeModule.forFeature([Duty]),
  ],
  exports: [
    DutiesService
  ]
})
export class DutiesModule {}
