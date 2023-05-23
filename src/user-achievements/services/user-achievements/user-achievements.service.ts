import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Achievements } from 'src/typeorm/entities/achievements';
import { UserAchievements } from 'src/typeorm/entities/userAchievements';
import { User } from 'src/typeorm/entities/users';
import { AddAchievementParams } from 'src/user-achievements/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UserAchievementsService {
    
    constructor(@InjectRepository(UserAchievements) private userAchievementsRepository: Repository<UserAchievements>, @InjectRepository(User) private userRepository: Repository<User>, @InjectRepository(Achievements) private AchievementsRepository: Repository<Achievements>, ) {}

    async addAchievement(addAchievementDetail: AddAchievementParams) {
        const user = await this.userRepository.findOneBy({ Id: addAchievementDetail.userId });
        const achievement = await this.AchievementsRepository.findOneBy({ Id: addAchievementDetail.achievementId });
        const newUserAchievement = this.userAchievementsRepository.create({
            User: user,
            Achivement: achievement,
        });
        return this.userAchievementsRepository.save(newUserAchievement);
    }

    async getUserAchievementsById(id: number) {
        return this.userAchievementsRepository.find({
            relations: {
                Achivement: true,
            },
            where: {
                User: {
                    Id: id,
                },
            },
        })
    }
}
