import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/prisma.service';
import { ContactsModule } from '../contacts/contacts.module';
import { LoginModule } from '../login/login.module';

@Module({
  imports: [forwardRef(() => LoginModule), forwardRef(() => ContactsModule)],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService]
})
export class UsersModule {}
