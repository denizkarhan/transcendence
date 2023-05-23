import { Module } from '@nestjs/common';
import { AuthanticaterController } from './controllers/authanticater/authanticater.controller';
import { AuthanticaterService } from './service/authanticater/authanticater.service';

@Module({
  controllers: [AuthanticaterController],
  providers: [AuthanticaterService]
})
export class AuthanticaterModule {}
