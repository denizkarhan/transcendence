import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMatchParams } from 'src/match-histories/utils/type';
import { MatchHistories } from 'src/typeorm/entities/matchHistories';
import { User } from 'src/typeorm/entities/users';
import { Repository } from 'typeorm';

@Injectable()
export class MatchHistoriesService {
    constructor(@InjectRepository(MatchHistories) private matchRepository: Repository<MatchHistories>, @InjectRepository(User) private readonly userRepository: Repository<User>){}

    async addMatch(createMatch: CreateMatchParams){
        const user = await this.userRepository.findOneBy({Id: createMatch.UserId});
        if (!user) return;
        var match = new MatchHistories();
        match.User = user;
        match.EnemyId = createMatch.EnemyId;
        match.MatchResult = createMatch.MatchResult;
        match.MatchDate = new Date();
        this.matchRepository.save(match);
    }
}
