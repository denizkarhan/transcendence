import { Module } from '@nestjs/common';
import { MatchHistoriesService } from './services/match-histories/match-histories.service';
import { MatchHistoriesController } from './controller/match-histories/match-histories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchHistories } from 'src/typeorm/entities/matchHistories';
import { User } from 'src/typeorm/entities/users';
import { UsersService } from 'src/users/service/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([MatchHistories, User])],
  providers: [MatchHistoriesService, UsersService],
  controllers: [MatchHistoriesController]
})
export class MatchHistoriesModule {}
