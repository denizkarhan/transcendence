import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/utils/jwt-auth.guard';
import { CreateStatsDto } from 'src/stats/dto/CreateStats.dto';
import { StatsService } from 'src/stats/service/stats.service';

@UseGuards(JwtAuthGuard)
@Controller('stats')
@ApiTags('stats')
@ApiBearerAuth()
export class StatsController {
    constructor(private statService: StatsService){}

    @Post('winCount')
    async winCount(@Body() createStats: CreateStatsDto, @Request() req){
        await this.statService.winCount(createStats, req.user);
    }
}
