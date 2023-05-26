import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/service/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { IrcController } from './irc.controller';
import { IrcService } from './irc.service';

@Module({
  imports:[UsersModule],
  controllers: [IrcController],
  providers: [IrcService]
})
export class IrcModule {}
