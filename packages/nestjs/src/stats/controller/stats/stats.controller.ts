import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/auth/local-auth/authenticated.guard';
import { CreateStatsDto } from 'src/stats/dto/CreateStats.dto';
import { StatsService } from 'src/stats/service/stats.service';

@UseGuards(AuthenticatedGuard)
@Controller('stats')
@ApiTags('stats')
export class StatsController {
    constructor(private statService: StatsService){}

    @Post('winCount')
    async winCount(@Body() createStats: CreateStatsDto){
        await this.statService.winCount(createStats);
    }
}
