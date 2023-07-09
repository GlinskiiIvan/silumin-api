import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { News } from './news.model';
import { FilesModule } from 'src/files/files.module';

@Module({
  providers: [NewsService],
  controllers: [NewsController],
  imports: [
    SequelizeModule.forFeature([News]),
    FilesModule
  ]
})
export class NewsModule {}
