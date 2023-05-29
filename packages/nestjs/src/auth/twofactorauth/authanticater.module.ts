import { Module } from '@nestjs/common';
import { AuthanticaterController } from './controllers/authanticater/authanticater.controller';
import { AuthanticaterService } from './service/authanticater/authanticater.service';
import { UsersModule } from 'src/users/users.module';

@Module({
	imports:[UsersModule],
  controllers: [AuthanticaterController],
  providers: [AuthanticaterService]
})
export class AuthanticaterModule {}
