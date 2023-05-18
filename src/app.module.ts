import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import "reflect-metadata";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/users';
import { UsersModule } from './users/users.module';
// import { AchievementsModule } from './achievements/achievements.module';
import { StatsModule } from './stats/stats.module';
import { MatchHistoriesModule } from './match-histories/match-histories.module';
import { UserAchievementsModule } from './user-achievements/user-achievements.module';
import { Friend } from './typeorm/entities/friends';
import { Stats } from './typeorm/entities/stats';
import { Achievements } from './typeorm/entities/achievements';
import { UserAchievements } from './typeorm/entities/userAchievements';
import { MatchHistories } from './typeorm/entities/matchHistories';
import { FriendsModule } from './friends/friends.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { AchievementsModule } from './achievements/achievements.module';
import { APP_FILTER } from '@nestjs/core';
import { BlockUserModule } from './block-user/block-user.module';
import { Blocks } from './typeorm/entities/blocks';


@Module({
  imports: [TypeOrmModule.forRoot({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'furkan',
	password: 'furkan123',
	database: 'furkan',
	entities: [User, Friend, Stats, Achievements, UserAchievements, MatchHistories, Blocks],
	synchronize: true,
  }), UsersModule, StatsModule, MatchHistoriesModule, UserAchievementsModule, FriendsModule, AuthModule, PassportModule.register({session:true}), AchievementsModule, BlockUserModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule{}
