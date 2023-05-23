import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateMatchDto } from 'src/match-histories/dto/CreateMatch.dto';
import { MatchHistoriesService } from 'src/match-histories/services/match-histories/match-histories.service';

@Controller('match-histories')
@ApiTags('match-histories')
export class MatchHistoriesController {
    constructor(private matchService: MatchHistoriesService){}

    @Post('addMatch')
    @UsePipes(new ValidationPipe())
    async addMatch(@Body() createMatch: CreateMatchDto){
        await this.matchService.addMatch(createMatch);
    }
}
