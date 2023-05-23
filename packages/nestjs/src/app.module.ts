import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import "reflect-metadata";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/users';
import { UsersModule } from './users/users.module';
import { StatsModule } from './stats/stats.module';
import { MatchHistoriesModule } from './match-histories/match-histories.module';
import { UserAchievementsModule } from './user-achievements/user-achievements.module';
import { Friend } from './typeorm/entities/friends';
import { Stats } from './typeorm/entities/stats';
import { Achievements } from './typeorm/entities/achievements';
import { UserAchievements } from './typeorm/entities/userAchievements';
import { MatchHistories } from './typeorm/entities/matchHistories';
import { FriendsModule } from './friends/friends.module';

import { AchievementsModule } from './achievements/achievements.module';
import { PassportModule } from '@nestjs/passport';

import { LocalAuthModule } from './auth/local-auth/local-auth.module';
import { AuthModule } from './auth/Google/auth.module';
import { SesssionSerialaize } from './auth/utils/Serialaizer';
import { FtAuthModule } from './auth/ft-auth/ft-auth.module';
import { AuthanticaterModule } from './auth/authanticater/authanticater.module';


@Module({
  imports: [TypeOrmModule.forRoot({
	type: 'postgres',
	host: 'localhost',
	port: 5433,
	username: 'postgres',
	password: '1',
	database: 'ft_transcendence',
	entities: [User, Friend, Stats, Achievements, UserAchievements, MatchHistories],
	synchronize: true,
  }), 
  UsersModule, StatsModule, MatchHistoriesModule, UserAchievementsModule, FriendsModule, AuthModule, 
  PassportModule.register({session:true}), AchievementsModule, LocalAuthModule, FtAuthModule, AuthanticaterModule],
  controllers: [AppController],
  providers: [AppService, SesssionSerialaize],
})

export class AppModule{}