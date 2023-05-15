import { IsNotEmpty } from "class-validator";

export class CreateMatchDto{
    @IsNotEmpty()
    UserId:number;

    @IsNotEmpty()
    EnemyId:number;

    @IsNotEmpty()
    MatchResult:number;
}