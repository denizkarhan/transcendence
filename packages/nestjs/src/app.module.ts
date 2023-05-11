import { Module } from '@nestjs/common';
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


@Module({
  imports: [TypeOrmModule.forRoot({
	type: 'postgres',
	host: 'postgres',
	port: 5432,
	username: 'postgres',
	password: 'example',
	database: 'postgres',
	entities: [User, Friend, Stats, Achievements, UserAchievements, MatchHistories],
	synchronize: true,
  }), UsersModule, StatsModule, MatchHistoriesModule, UserAchievementsModule, FriendsModule, AuthModule, PassportModule.register({session:true}), AchievementsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
