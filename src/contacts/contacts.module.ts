import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Contact } from './contacts.model';

@Module({
  providers: [ContactsService],
  imports: [
    SequelizeModule.forFeature([Contact]),
  ],
  exports: [
    ContactsService
  ]
})
export class ContactsModule {}
