import { Module } from '@nestjs/common';
import { AchievementsService } from './service/achievements/achievements.service';
import { AchievementsController } from './controller/achievements/achievements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achievements } from 'src/typeorm/entities/achievements';

@Module({
	imports: [TypeOrmModule.forFeature([Achievements])],
  controllers: [AchievementsController],
  providers: [AchievementsService]
})
export class AchievementsModule {}
