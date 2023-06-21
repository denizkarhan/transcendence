import { Module } from '@nestjs/common';
import { ChatService } from './service/chat/chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { BlockUserModule } from 'src/block-user/block-user.module';
import { ChatGateWay } from './chat.gateway';
import { GroupChat } from 'src/typeorm/entities/groupChat';
import { GroupChatUsers } from 'src/typeorm/entities/groupChatUsers';
import { GroupMessages } from 'src/typeorm/entities/GroupMessages';

@Module({
  imports:[TypeOrmModule.forFeature([GroupChat, GroupChatUsers, GroupMessages]), UsersModule, BlockUserModule],
  providers: [ChatService, ChatGateWay]
  
})
export class ChatModule {}
