import { Module } from '@nestjs/common';
import { AchievementsModule } from 'src/achievements/achievements.module';
import { SeedService } from './seed.service';

@Module({
  providers: [SeedService],
  imports: [AchievementsModule],
})
export class SeedModule {}
