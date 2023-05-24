import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/local-auth/jwt-auth.guard';
import { AuthenticatedGuard } from 'src/auth/utils/authenticated.guard';
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
    async addMatch(@Body() createMatch: CreateMatchDto){
        await this.matchService.addMatch(createMatch);
    }
}
