import { IsNotEmpty } from "class-validator";
import { User } from "src/typeorm/entities/users";

export class BlockUserDto {
    
    @IsNotEmpty()
    blockingUserId: number;

    @IsNotEmpty()
    blockedUserId: number;
}