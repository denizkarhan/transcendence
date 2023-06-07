import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/users';
import { Chat } from 'src/typeorm/entities/chat';
import { UsersService } from 'src/users/service/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/Google/auth.module';
import { LocalAuthModule } from 'src/auth/local-auth/local-auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Chat]), UsersModule, LocalAuthModule],
  controllers: [ChatController],
  providers: [ChatService, UsersService, ChatGateway],
  exports: [ChatService,]
})
export class ChatModule {}
