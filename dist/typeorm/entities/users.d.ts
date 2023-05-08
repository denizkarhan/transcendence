import { Friend } from "./friends";
import { MatchHistories } from "./matchHistories";
import { UserAchievements } from "./userAchievements";
export declare class User {
    Id: number;
    FirstName: string;
    LastName: string;
    Login: string;
    Email: string;
    Status: number;
    Password: string;
    CreatedAt: Date;
    UpdatedAt: Date;
    friend: Friend[];
    MachHistory: MatchHistories[];
    UserAchievement: UserAchievements[];
}
