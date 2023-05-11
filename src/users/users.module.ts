import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/users';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './service/users/users.service';
import { UserMapper } from './dtos/UserMapper';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UserMapper]
})
export class UsersModule {}
