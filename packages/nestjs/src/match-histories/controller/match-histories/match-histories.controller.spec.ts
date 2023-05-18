import { Test, TestingModule } from '@nestjs/testing';
import { MatchHistoriesController } from './match-histories.controller';

describe('MatchHistoriesController', () => {
  let controller: MatchHistoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchHistoriesController],
    }).compile();

    controller = module.get<MatchHistoriesController>(MatchHistoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
