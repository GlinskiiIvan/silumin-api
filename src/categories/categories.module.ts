import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './categories.model';
import { ProductsModule } from 'src/products/products.module';
import { ServicesModule } from 'src/services/services.module';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [
    SequelizeModule.forFeature([Category]),
    ProductsModule,
    ServicesModule
  ]
})
export class CategoriesModule {}
