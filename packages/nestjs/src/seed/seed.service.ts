import { Injectable } from '@nestjs/common';
import { AchievementsService } from 'src/achievements/service/achievements/achievements.service';

@Injectable()
export class SeedService {
  constructor(private achievementService: AchievementsService) {}


  async seedAchievements() {
    // Read the seed data from the file
    
    const seedData = require('./achievements.seed');
    console.log(seedData);
    // Insert the achievements into the database
    await this.achievementService.defAchievements(seedData);
  }
}