import { User } from "./user";

export interface Match{
    Id:string,

    Enemy:User,

    MatchDate:Date,

    MyResult:number,

    EnemyResult:number,

    MatchResult:number,
}