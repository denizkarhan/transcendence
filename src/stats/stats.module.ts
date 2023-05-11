import { Module } from '@nestjs/common';
import { StatsService } from './service/stats.service';
import { ControllerController } from './controller/controller.controller';

@Module({
  providers: [StatsService],
  controllers: [ControllerController]
})
export class StatsModule {}
