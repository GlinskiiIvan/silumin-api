import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Service } from './services.model';
import { DocumentsModule } from 'src/documents/documents.module';
import { FilesModule } from 'src/files/files.module';
import { EmployeesModule } from 'src/employees/employees.module';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService],
  imports: [
    SequelizeModule.forFeature([Service]),
    DocumentsModule,
    FilesModule,
    EmployeesModule
  ],
  exports: [
    ServicesService
  ]
})
export class ServicesModule {}
