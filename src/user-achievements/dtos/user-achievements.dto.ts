import { IsNotEmpty } from "class-validator";

export class UserAchievementDto {
    
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    achievementId: number;
}