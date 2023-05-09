import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/service/users/users.service';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    getUserByName(userName: string): void;
    createUser(createUserDto: CreateUserDto): void;
}
