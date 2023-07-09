import { LicensesCategory } from 'src/licenses-category/licenses-category.model';
import { Module } from '@nestjs/common';
import { LicensesCategoryService } from './licenses-category.service';
import { LicensesCategoryController } from './licenses-category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Licenses } from 'src/licenses/licenses.model';
import { LicensesModule } from 'src/licenses/licenses.module';

@Module({
  providers: [LicensesCategoryService],
  controllers: [LicensesCategoryController],
  imports: [
    SequelizeModule.forFeature([LicensesCategory, Licenses]),
    LicensesModule
  ]
})
export class LicensesCategoryModule {}
