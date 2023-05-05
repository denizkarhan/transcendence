import { User } from 'src/typeorm/entities/user';
import { CreateUserParams } from 'src/utils/type';
import { Repository } from 'typeorm';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findUser(): void;
    createUser(userDetail: CreateUserParams): Promise<User>;
}
