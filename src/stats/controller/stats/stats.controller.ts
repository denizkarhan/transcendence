import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateStatsDto } from 'src/stats/dto/CreateStats.dto';
import { StatsService } from 'src/stats/service/stats.service';

@Controller('stats')
@ApiTags('stats')
export class StatsController {
    constructor(private statService: StatsService){}

    @Post('winCount')
    async winCount(@Body() createStats: CreateStatsDto){
        await this.statService.winCount(createStats);
    }
}
