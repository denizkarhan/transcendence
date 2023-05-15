import { IsNotEmpty } from "class-validator";

export class CreateStatsDto{
    @IsNotEmpty()
    UserId:number;

    @IsNotEmpty()
    WinCount:number;

    @IsNotEmpty()
    LoseCount:number;

    @IsNotEmpty()
    LadderLevel:number;
}