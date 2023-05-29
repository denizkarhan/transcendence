import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blocks } from 'src/typeorm/entities/blocks';
import { User } from 'src/typeorm/entities/users';
import { UsersService } from 'src/users/service/users/users.service';
import { BlockUserController } from './controllers/block-user.controller';
import { BlockUserService } from './services/block-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Blocks, User])],
  controllers: [BlockUserController],
  providers: [BlockUserService, UsersService]
})
export class BlockUserModule {}
