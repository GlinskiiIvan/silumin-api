import { Module } from '@nestjs/common';
import { ContactsBranchesService } from './contacts-branches.service';
import { ContactsBranchesController } from './contacts-branches.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContactBranche } from './contacts-branches.model';
import { ContactsModule } from 'src/contacts/contacts.module';

@Module({
  providers: [ContactsBranchesService],
  controllers: [ContactsBranchesController],
  imports: [
    SequelizeModule.forFeature([ContactBranche]),
    ContactsModule
  ]
})
export class ContactsBranchesModule {}
