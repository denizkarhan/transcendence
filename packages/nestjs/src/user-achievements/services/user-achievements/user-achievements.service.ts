import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Achievements } from 'src/typeorm/entities/achievements';
import { UserAchievements } from 'src/typeorm/entities/userAchievements';
import { User } from 'src/typeorm/entities/users';
import { AddAchievementParams } from 'src/user-achievements/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UserAchievementsService {
    
    constructor(@InjectRepository(UserAchievements) private userAchievementsRepository: Repository<UserAchievements>, @InjectRepository(Achievements) private AchievementsRepository: Repository<Achievements>, ) {}

    async addAchievement(id:number, user: User) {
        const achievement = await this.AchievementsRepository.findOneBy({ Id: id });
        const newUserAchievement = this.userAchievementsRepository.create({
            User: user,
            Achievement: achievement,
        });
        if (!(await this.userAchievementsRepository.exist({ where: { Achievement: achievement}})))
            return await this.userAchievementsRepository.save(newUserAchievement);
    }

    async getUserAchievements(user:User) {
        return await this.userAchievementsRepository.find({
            relations: {
                Achievement: true,
            },
            where: {
                User: user
            },
        })
    }
}
