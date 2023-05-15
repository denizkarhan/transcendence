import { Body, Controller, Post } from '@nestjs/common';
import { CreateStatsDto } from 'src/stats/dto/CreateStats.dto';
import { StatsService } from 'src/stats/service/stats.service';

@Controller('stats')
export class StatsController {
    constructor(private statService: StatsService){}

    @Post('winCount')
    async winCount(@Body() createStats: CreateStatsDto){
        await this.statService.winCount(createStats);
    }
}
