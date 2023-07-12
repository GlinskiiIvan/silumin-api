import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UsersRoles } from './roles/users-roles.model';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import { News } from './news/news.model';
import { FilesModule } from './files/files.module';
import { LicensesCategoryModule } from './licenses-category/licenses-category.module';
import { LicensesModule } from './licenses/licenses.module';
import { LicensesCategory } from './licenses-category/licenses-category.model';
import { Licenses } from './licenses/licenses.model';
import { DutiesModule } from './duties/duties.module';
import { JobOpening } from './job-openings/job-openings.model';
import { Duty } from './duties/duties.model';
import { JobOpeningsModule } from './job-openings/job-openings.module';
import { ContactsModule } from './contacts/contacts.module';
import { EmployeesModule } from './employees/employees.module';
import { ContactsBranchesModule } from './contacts-branches/contacts-branches.module';
import { Employee } from './employees/employees.model';
import { ContactBranche } from './contacts-branches/contacts-branches.model';
import { Contact } from './contacts/contacts.model';
import { DocumentsModule } from './documents/documents.module';
import { ProjectsModule } from './projects/projects.module';
import { Document } from './documents/documents.model';
import { Project } from './projects/projects.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { SpecificationsModule } from './specifications/specifications.module';
import { Specification } from './specifications/specifications.model';
import { EquipmentsModule } from './equipments/equipments.module';
import { Equipment } from './equipments/equipments.model';
import { RequirementsModule } from './requirements/requirements.module';
import { JobOpeningRequirement } from './job-openings/job-openings-requirements.model';
import { Requirement } from './requirements/requirements.model';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { ServicesModule } from './services/services.module';
import { Category } from './categories/categories.model';
import { Product } from './products/products.model';
import { Service } from './services/services.model';
import { CategoryProduct } from './categories/categories-products.model';
import { CategoryService } from './categories/categories-services';
import { ServiceEmployee } from './services/services-employees.model';
import { ProductEmployee } from './products/products-employees.model';
import { EquipmentEmployee } from './equipments/equipments-employees.model';
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadModels: true,
      // dialectOptions: {
      //   ssl: {
      //     require: true,
      //   }
      // },
      models: [
        User, 
        Role, 
        UsersRoles, 
        News, 
        LicensesCategory, 
        Licenses, 
        JobOpening, 
        JobOpeningRequirement,
        Requirement,     
        Duty, 
        Employee, 
        ContactBranche, 
        Contact,
        Document,
        Project,
        Specification,
        Equipment,
        Category,
        Product,
        Service,
        CategoryProduct,
        CategoryService,
        ServiceEmployee,
        ProductEmployee,
        EquipmentEmployee
      ],
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    NewsModule,
    FilesModule,
    LicensesCategoryModule,
    LicensesModule,
    DutiesModule,
    JobOpeningsModule,
    ContactsModule,
    EmployeesModule,
    ContactsBranchesModule,
    DocumentsModule,
    ProjectsModule,
    ServeStaticModule.forRoot(
      {
        rootPath: path.join(__dirname, '..', 'static', 'document'),
        renderPath: '/document',
      },
      {
        rootPath: path.join(__dirname, '..', 'static', 'image'),
        renderPath: '/image',
      },
    ),
    SpecificationsModule,
    EquipmentsModule,
    RequirementsModule,
    CategoriesModule,
    ProductsModule,
    ServicesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule {}
