import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AchievementsService } from 'src/achievements/service/achievements/achievements.service';
import { Achievements } from 'src/typeorm/entities/achievements';
import { UserAchievements } from 'src/typeorm/entities/userAchievements';
import { User } from 'src/typeorm/entities/users';
import { UsersService } from 'src/users/service/users/users.service';
import { UserAchievementsController } from './controllers/user-achievements/user-achievements.controller';
import { UserAchievementsService } from './services/user-achievements/user-achievements.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserAchievements, Achievements]), UsersModule],
  controllers: [UserAchievementsController],
  providers: [UserAchievementsService, AchievementsService]
})
export class UserAchievementsModule {

}
