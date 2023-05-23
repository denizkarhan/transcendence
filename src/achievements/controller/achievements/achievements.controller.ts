import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAchievementDto } from 'src/achievements/dto/create-achievement.dto';
import { AchievementsService } from 'src/achievements/service/achievements/achievements.service';

@Controller('achievements')
@ApiTags('achievements')
export class AchievementsController {

	constructor(private achievementService: AchievementsService){}

	@Get('all')
	async getAchievements(){
		return await this.achievementService.getAchievement();
	}

	@Get(':id')
	async getAchievementById(@Param('id') id : number){
		return await this.achievementService.getArchievementById(id);
	}

	@Post()
	createAchievement(@Body() createAchievementDto: CreateAchievementDto){
		this.achievementService.createAchievement(createAchievementDto);
	}
}
