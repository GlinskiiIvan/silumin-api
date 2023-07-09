import { Licenses } from 'src/licenses/licenses.model';
import { Module } from '@nestjs/common';
import { LicensesService } from './licenses.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { LicensesCategory } from 'src/licenses-category/licenses-category.model';
import { FilesModule } from 'src/files/files.module';

@Module({
  providers: [LicensesService],
  imports: [
    SequelizeModule.forFeature([Licenses, LicensesCategory]),
    FilesModule
  ],
  exports: [
    LicensesService
  ]
})
export class LicensesModule {}
