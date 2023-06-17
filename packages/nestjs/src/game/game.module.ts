import { Module } from '@nestjs/common';
import { MatchHistoriesModule } from 'src/match-histories/match-histories.module';
import { PongGateway } from './pong.gateway';

@Module({
    imports:[MatchHistoriesModule],
    providers:[PongGateway]
})
export class GameModule {}
