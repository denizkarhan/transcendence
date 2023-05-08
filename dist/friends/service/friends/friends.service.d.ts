import { CreateFriendParams } from 'src/friends/utils/type';
import { Friend } from 'src/typeorm/entities/friends';
import { Repository } from 'typeorm';
export declare class FriendsService {
    private friendRepository;
    constructor(friendRepository: Repository<Friend>);
    addFriend(friendParam: CreateFriendParams): Promise<void>;
}
