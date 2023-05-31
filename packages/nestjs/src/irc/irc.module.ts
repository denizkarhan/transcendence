import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from 'src/typeorm/entities/channels';
import { ChannelUserList } from 'src/typeorm/entities/channelUserList';
import { Message } from 'src/typeorm/entities/message';
import { UsersService } from 'src/users/service/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { IrcController } from './irc.controller';
import { IrcService } from './irc.service';

@Module({
  imports:[TypeOrmModule.forFeature([Message, Channel, ChannelUserList]), UsersModule],
  controllers: [IrcController],
  providers: [IrcService]
})
export class IrcModule {}
