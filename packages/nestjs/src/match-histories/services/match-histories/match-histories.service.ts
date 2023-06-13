import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { CreateMatchParams } from 'src/match-histories/utils/type';
import { MatchHistories } from 'src/typeorm/entities/matchHistories';
import { User } from 'src/typeorm/entities/users';
import { SerializedUser } from 'src/users/dtos/UserMapper';
import { UsersService } from 'src/users/service/users/users.service';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MatchHistoriesService {
    constructor(@InjectRepository(MatchHistories) private matchRepository: Repository<MatchHistories>, private readonly userService : UsersService){}

    async addMatch(createMatch: CreateMatchParams, userName:string){
		const user = await this.userService.getUserByLogin(userName);
        const enemy = await this.userService.getUser(createMatch.EnemyId);
        if (!user) return;
        var match = new MatchHistories();
        match.User = user;
        match.Enemy = enemy;
        match.MyResult = createMatch.MyResult;
        match.EnemyResult = createMatch.EnemyResult;
        match.MatchDate = new Date();
        match.MatchResult = match.MyResult > match.EnemyResult ? 1 : match.MyResult == match.EnemyResult ? 0 : 2;
        this.matchRepository.save(match);
    }

	async getMatch(userName:string){
		const user = await this.userService.getUserByLogin(userName);
		const res = await this.matchRepository.find({where:{User:user}, relations:['Enemy']});
		const enemy = res.map((response)=>plainToClass(SerializedUser, response.Enemy));
		res.forEach((response) => {
			const updatedEnemy = plainToClass(SerializedUser, response.Enemy);
			response.Enemy = updatedEnemy;
		  });
		if (res)
			return res;
		return null;
	}
}
