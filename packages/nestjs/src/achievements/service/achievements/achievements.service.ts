import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAchievementParams } from 'src/achievements/utils/type';

import { Achievements } from 'src/typeorm/entities/achievements';
import { DataSource, Repository } from 'typeorm';

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
		})
		this.achievementRepository.save(newAchievement);
	}

	async defAchievements(data: any) {
		console.log('TESTING ', data.CategorySeed);
		if (await this.achievementRepository.count() === 0)
			await this.achievementRepository.insert(data.CategorySeed);
	}
}
