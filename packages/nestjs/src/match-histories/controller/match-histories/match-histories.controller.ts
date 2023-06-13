import { Body, Controller, Get, Post, Req, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/utils/jwt-auth.guard';
import { CreateMatchDto } from 'src/match-histories/dto/CreateMatch.dto';
import { MatchHistoriesService } from 'src/match-histories/services/match-histories/match-histories.service';

@UseGuards(JwtAuthGuard)
@Controller('match-histories')
@ApiTags('match')
@ApiBearerAuth()
export class MatchHistoriesController {
    constructor(private matchService: MatchHistoriesService){}

    @Post('addMatch')
    @UsePipes(new ValidationPipe())
    async addMatch(@Body() createMatch: CreateMatchDto, @Request() req){
        await this.matchService.addMatch(createMatch, req.user.Login);
    }

	@Get()
	async getMatches(@Req() requset){
		
		return await this.matchService.getMatch(requset.user.Login);
	}
}
