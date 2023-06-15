import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
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
import { Blocks } from './typeorm/entities/blocks';
import { Avatar } from './typeorm/entities/avatar';
import { BlockUserModule } from './block-user/block-user.module';
import { UploadsModule } from './uploads/uploads.module';
import { Message } from './typeorm/entities/messages';
import { Channel } from './typeorm/entities/channels';
import { ChannelUserList } from './typeorm/entities/channelUserList';
import { ChatModule } from './chat/chat.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/utils/jwt-auth.guard';
import { JwtStrategy } from './auth/utils/jwt.strategy';
import { AuthanticatorModule } from './auth/twofactorauth/authanticator.module';
import * as cookieParser from 'cookie-parser';

@Module({
  imports: [TypeOrmModule.forRoot({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'ftuncer',
	password: '123',
	database: 'ftuncer',
	entities: [User, Friend, Stats, Achievements, UserAchievements, MatchHistories, Blocks, Avatar, Message, Channel, ChannelUserList],
	synchronize: true,
  }), 
  UsersModule, StatsModule, MatchHistoriesModule, UserAchievementsModule, FriendsModule, AuthModule, 
  PassportModule.register({session:true}), AchievementsModule, LocalAuthModule, FtAuthModule, AuthanticatorModule,  BlockUserModule, UploadsModule, ChatModule],
  controllers: [AppController],
  providers: [AppService, SesssionSerialaize, JwtStrategy,
	{
		provide: APP_GUARD,
		useClass: JwtAuthGuard,
	}],
})

export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	  consumer
		.apply(cookieParser())
		.forRoutes('*');
	}
  }
  
