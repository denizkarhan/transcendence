import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/service/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { AuthanticaterController } from './controllers/authanticater/authanticater.controller';
import { AuthanticaterService } from './service/authanticater/authanticater.service';

@Module({
  imports: [UsersModule, JwtModule],
  controllers: [AuthanticaterController],
  providers: [AuthanticaterService],
  exports: [AuthanticaterService]
})
export class AuthanticaterModule {}
