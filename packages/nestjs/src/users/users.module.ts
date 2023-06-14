import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalAuthModule } from 'src/auth/local-auth/local-auth.module';
import { User } from 'src/typeorm/entities/users';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './service/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/local-auth/constants';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
		secret: jwtConstants.secret,
	})],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
