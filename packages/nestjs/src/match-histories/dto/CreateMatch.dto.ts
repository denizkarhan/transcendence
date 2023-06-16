import { IsNotEmpty } from "class-validator";

export class CreateMatchDto{

    @IsNotEmpty()
    EnemyUserName:string;

    @IsNotEmpty()
    MyResult:number;

    @IsNotEmpty()
    EnemyResult:number;
}