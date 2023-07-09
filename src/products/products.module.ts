import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './products.model';
import { DocumentsModule } from 'src/documents/documents.module';
import { FilesModule } from 'src/files/files.module';
import { EmployeesModule } from 'src/employees/employees.module';
import { EquipmentsModule } from 'src/equipments/equipments.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    SequelizeModule.forFeature([Product]),
    DocumentsModule,
    FilesModule,
    EmployeesModule,
    EquipmentsModule
  ],
  exports: [
    ProductsService
  ]
})
export class ProductsModule {}
