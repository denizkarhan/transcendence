import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAchievementParams } from 'src/utils/type';
import { Achievements } from 'src/typeorm/entities/achievements';
import { Repository } from 'typeorm';

@Injectable()
export class AchievementsService {

	constructor(@InjectRepository(Achievements) private achievementRepository: Repository<Achievements>){}

	async getAchievement(){
		return await this.achievementRepository.find();
	}

	async getArchievementById(id : number){
		return await this.achievementRepository.findOneBy({Id:id});
	}

	async createAchievement(achievementParam: CreateAchievementParams){
		const newAchievement = this.achievementRepository.create({
			...achievementParam,
			CreatedAt : new Date()
		})
		this.achievementRepository.save(newAchievement);
	}
}