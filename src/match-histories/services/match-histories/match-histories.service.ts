import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMatchParams } from 'src/match-histories/utils/type';
import { MatchHistories } from 'src/typeorm/entities/matchHistories';
import { User } from 'src/typeorm/entities/users';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MatchHistoriesService {
    private userRepository;
    constructor(@InjectRepository(MatchHistories) private matchRepository: Repository<MatchHistories>, private readonly dataSource : DataSource){
        this.userRepository = dataSource.getRepository(User);
    }

    async addMatch(createMatch: CreateMatchParams){
        const user = await this.userRepository.findOneBy({Id: createMatch.UserId});
        const enemy = await this.userRepository.findOneBy({Id: createMatch.EnemyId});
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
}
