import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { LoginModule } from './modules/login/login.module';
import { ContactsModule } from './modules/contacts/contacts.module';

@Module({
  imports: [UsersModule, LoginModule, ContactsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
