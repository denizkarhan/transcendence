import { Injectable} from '@nestjs/common';
import { AuthService } from 'src/auth/AuthService';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/service/users/users.service';

@Injectable()
export class GoogleAuthService extends AuthService{

	constructor(protected userService: UsersService){
		super(userService);
	}

	async validateUser(details: CreateUserDto){
		const user = await this.userService.getUserByEmail(details.Email);
		if (user) return user;
		return this.userService.createUser(details);
	}

	// async findUser(id :number){
	// 	return await this.userService.getUserById(id);
	// }
}
