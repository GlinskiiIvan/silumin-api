import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { FilesModule } from 'src/files/files.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Document } from './documents.model'
import { Project } from 'src/projects/projects.model';

@Module({
  providers: [DocumentsService],
  imports: [
    SequelizeModule.forFeature([Document, Project]),
    FilesModule
  ],
  exports: [
    DocumentsService
  ]
})
export class DocumentsModule {}
