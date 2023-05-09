import { User } from 'src/typeorm/entities/users';
import { CreateUserParams } from 'src/utils/type';
import { Repository } from 'typeorm';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findOne(username: string): Promise<User | undefined>;
    getUserIdByName(name: string): Promise<number>;
    createUser(userDetail: CreateUserParams): Promise<User>;
}
