import { Module } from '@nestjs/common';
import { MatchHistoriesService } from './services/match-histories/match-histories.service';
import { MatchHistoriesController } from './controller/match-histories/match-histories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchHistories } from 'src/typeorm/entities/matchHistories';
import { User } from 'src/typeorm/entities/users';
import { UsersService } from 'src/users/service/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { UserAchievementsModule } from 'src/user-achievements/user-achievements.module';

@Module({
  imports: [TypeOrmModule.forFeature([MatchHistories]), UsersModule, UserAchievementsModule],
  providers: [MatchHistoriesService],
  controllers: [MatchHistoriesController],
  exports:[MatchHistoriesService]
})
export class MatchHistoriesModule {}
