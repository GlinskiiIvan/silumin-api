import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from './projects.model';
import { DocumentsModule } from 'src/documents/documents.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [
    SequelizeModule.forFeature([Project]),
    DocumentsModule,
    FilesModule
  ]
})
export class ProjectsModule {}
