import { Test, TestingModule } from '@nestjs/testing';
import { MatchHistoriesService } from './match-histories.service';

describe('MatchHistoriesService', () => {
  let service: MatchHistoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchHistoriesService],
    }).compile();

    service = module.get<MatchHistoriesService>(MatchHistoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
