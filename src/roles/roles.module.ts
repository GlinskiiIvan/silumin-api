import {forwardRef, Module} from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { User } from 'src/users/users.model';
import { UsersRoles } from './users-roles.model';
import { AuthModule } from 'src/auth/auth.module';
import {UsersModule} from "../users/users.module";

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    SequelizeModule.forFeature([Role, User, UsersRoles]),
    AuthModule,
    forwardRef(() => UsersModule)
  ],
  exports: [
      RolesService
  ]
})
export class RolesModule {}
