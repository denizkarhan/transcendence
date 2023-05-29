import { Inject, Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/typeorm/entities/users';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/service/users/users.service';

@Injectable()
export class GoogleAuthService{

	constructor(@Inject(UsersService) private userService: UsersService, private jwtService: JwtService,){}

	async validateUser(details: CreateUserDto){
		const user = await this.userService.getUserByEmail(details.Email);
		if (user) return user;
		return this.userService.createUser(details);
	}

	async login(user: any) {
		const payload = { Login: user.Login, Id: user.Id };
		return {
		  access_token: this.jwtService.sign(payload),
		};
	}
}
