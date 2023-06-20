import { Module } from '@nestjs/common';
import { ChatService } from './service/chat/chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from 'src/typeorm/entities/chat';
import { UsersModule } from 'src/users/users.module';
import { BlockUserModule } from 'src/block-user/block-user.module';
import { ChatGateWay } from './chat.gateway';

@Module({
  imports:[TypeOrmModule.forFeature([Chat]), UsersModule, BlockUserModule],
  providers: [ChatService, ChatGateWay]
  
})
export class ChatModule {}
