import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { CreateMatchParams } from 'src/match-histories/utils/type';
import { MatchHistories } from 'src/typeorm/entities/matchHistories';
import { UserAchievementsService } from 'src/user-achievements/services/user-achievements/user-achievements.service';
import { SerializedUser } from 'src/users/dtos/UserMapper';
import { UsersService } from 'src/users/service/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class MatchHistoriesService {
  constructor(@InjectRepository(MatchHistories) private matchRepository: Repository<MatchHistories>, private readonly userService: UsersService, private readonly userAchievementService: UserAchievementsService) { }

  async addMatch(createMatch: CreateMatchParams, userName: string) {
    const user = await this.userService.getUserByLogin(userName);
    const enemy = await this.userService.getUserByLogin(createMatch.EnemyUserName);
    if (!user) return;

    if ((await this.matchRepository.findAndCount({ where: { User: user, MatchResult: 1} }))[1] === 0) {
      this.userAchievementService.addAchievement(2, user);
    };

    var match = new MatchHistories();
    match.User = user;
    match.Enemy = enemy;
    match.MyResult = createMatch.MyResult;
    match.EnemyResult = createMatch.EnemyResult;
    match.MatchDate = new Date();
    match.MatchResult = match.MyResult > match.EnemyResult ? 1 : match.MyResult == match.EnemyResult ? 0 : 2;
    this.matchRepository.save(match);

    if (createMatch.MyResult > createMatch.EnemyResult &&
      (await this.matchRepository.findAndCount({ where: { User: user, MatchResult: 1 } }))[1] === 0) {
      this.userAchievementService.addAchievement(1, user);
    };

    if (createMatch.MyResult > 0 && createMatch.EnemyResult === 0) {
      this.userAchievementService.addAchievement(3, user);
    }

    const arr = (await this.matchRepository.findAndCount({ where: { User: user } }))[1];
    const arr2 = (await this.matchRepository.findAndCount({ where: { User: enemy } }))[1];
    
    if (arr >= 25)
      this.userAchievementService.addAchievement(6, user);
    else if (arr >= 10)
      this.userAchievementService.addAchievement(5, user);
    else if (arr >= 5)
      this.userAchievementService.addAchievement(4, user);

    
      if (arr2 >= 25)
        this.userAchievementService.addAchievement(6, enemy);
      else if (arr2 >= 10)
        this.userAchievementService.addAchievement(5, enemy);
      else if (arr2 >= 5)
        this.userAchievementService.addAchievement(4, enemy);
  }


  async getMatch(userName: string) {
    const user = await this.userService.getUserByLogin(userName);
    const res = await this.matchRepository.find({ where: { User: user }, relations: ['Enemy'] });
    res.forEach((response) => {
      const updatedEnemy = plainToClass(SerializedUser, response.Enemy);
      response.Enemy = updatedEnemy;
    });
    if (res)
      return res;
    return null;
  }

  async getMatchByUser(userName: string) {
    const user = await this.userService.getUserByLogin(userName);
    const res = await this.matchRepository.find({ where: { User: user }, relations: ['Enemy'] });
    res.forEach((response) => {
      const updatedEnemy = plainToClass(SerializedUser, response.Enemy);
      response.Enemy = updatedEnemy;
    });
    if (res)
      return res;
    return null;
  }
}