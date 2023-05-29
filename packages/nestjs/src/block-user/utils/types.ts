import { User } from "src/typeorm/entities/users";

export type BlockUserParams = {
    
    blockingUser: User;

    blockedUser: User;
}

export type unBlockUserParams = {
    
    unblockingUser: User;

    unblockedUser: User;
}