import { Module } from '@nestjs/common';
import { StatsService } from './service/stats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stats } from 'src/typeorm/entities/stats';
import { StatsController } from './controller/stats/stats.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Stats])],
  providers: [StatsService],
  controllers: [StatsController]
})
export class StatsModule {}
