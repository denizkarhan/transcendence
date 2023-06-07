import { IsNotEmpty } from "class-validator";

export class CreateStatsDto{

    @IsNotEmpty()
    WinCount:number;

    @IsNotEmpty()
    LoseCount:number;

    @IsNotEmpty()
    LadderLevel:number;
}