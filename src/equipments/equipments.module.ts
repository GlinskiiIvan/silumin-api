import { Module } from '@nestjs/common';
import { EquipmentsController } from './equipments.controller';
import { EquipmentsService } from './equipments.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Equipment } from './equipments.model';
import { FilesModule } from 'src/files/files.module';
import { DocumentsModule } from 'src/documents/documents.module';
import { SpecificationsModule } from 'src/specifications/specifications.module';
import { EmployeesModule } from 'src/employees/employees.module';

@Module({
  controllers: [EquipmentsController],
  providers: [EquipmentsService],
  imports: [
    SequelizeModule.forFeature([Equipment]),
    FilesModule,
    DocumentsModule,
    SpecificationsModule,
    EmployeesModule
  ],
  exports: [
    EquipmentsService
  ]
})
export class EquipmentsModule {}
