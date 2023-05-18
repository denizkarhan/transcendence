import { IsNotEmpty } from "class-validator";
import { User } from "src/typeorm/entities/users";

export class UnBlockUserDto {
    
    @IsNotEmpty()
    unblockingUserId: number;

    @IsNotEmpty()
    unblockedUserId: number;
}