import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateAchievementDto } from 'src/achievements/dto/create-achievement.dto';
import { AchievementsService } from 'src/achievements/service/achievements/achievements.service';
import { JwtAuthGuard } from 'src/auth/utils/jwt-auth.guard';

@Controller('achievements')
@ApiTags('achievements')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
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
}
