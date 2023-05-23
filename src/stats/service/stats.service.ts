import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stats } from 'src/typeorm/entities/stats';
import { CreateStatsParams } from 'src/stats/utils/type';
import { User } from 'src/typeorm/entities/users';
import { DataSource, Repository } from 'typeorm';
import { Pool } from 'pg';
import { MatchHistories } from 'src/typeorm/entities/matchHistories';

@Injectable()
export class StatsService {
    private userRepository;
    private matchRepository;
    constructor(@InjectRepository(Stats) private statsRepository: Repository<Stats>, private readonly dataSource : DataSource){
        this.matchRepository = dataSource.getRepository(MatchHistories);
        this.userRepository = dataSource.getRepository(User);
    }

    async winCount(createMatch: CreateStatsParams){
        const user = await this.userRepository.findOneBy({Id: createMatch.UserId});
        if (!user) return;
        var stats = new Stats();
        try {
            const win = await this.matchRepository.findAndCount({where:{User:user, MatchResult:1}});
            const lose = await this.matchRepository.findAndCount({where:{User:user, MatchResult:2}});
            const winC = win[1];
            const loseC = lose[1];
            console.log('Kazanılan Maçlar:');
            console.log(winC);
            console.log('Kaybedilen Maçlar:');
            console.log(loseC);
            stats.User = user;
            stats.WinCount = winC;
            stats.LoseCount = loseC;
            stats.LadderLevel = 1;
            this.statsRepository.save(stats);
        }catch{}

        
    }
}
