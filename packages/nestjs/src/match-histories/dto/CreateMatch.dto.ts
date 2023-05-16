import { IsNotEmpty } from "class-validator";

export class CreateMatchDto{
    @IsNotEmpty()
    UserId:number;

    @IsNotEmpty()
    EnemyId:number;

    @IsNotEmpty()
    MyResult:number;

    @IsNotEmpty()
    EnemyResult:number;
}