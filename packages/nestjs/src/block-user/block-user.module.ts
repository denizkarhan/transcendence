import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blocks } from 'src/typeorm/entities/blocks';
import { User } from 'src/typeorm/entities/users';
import { UsersService } from 'src/users/service/users/users.service';
import { BlockUserController } from './controllers/block-user.controller';
import { BlockUserService } from './services/block-user.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Blocks]), UsersModule],
  controllers: [BlockUserController],
  providers: [BlockUserService]
})
export class BlockUserModule {}
