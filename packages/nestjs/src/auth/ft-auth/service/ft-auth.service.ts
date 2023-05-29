import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { SerializedUser } from 'src/users/dtos/UserMapper';
import { UsersService } from 'src/users/service/users/users.service';

@Injectable()
export class FtAuthService {
	constructor(private userService : UsersService, private jwtService: JwtService){}

	async validateUser(details: CreateUserDto){
		const user = await this.userService.getUserByEmail(details.Email);
		if (user) return user;
		return this.userService.createUser(details);
	}

	async login(user: any) {
		const newUser = await this.userService.getUserByLogin(user.username);
		const payload = { Login: newUser.Login, Id: newUser.Id };
		return {
		  access_token: this.jwtService.sign(payload),
		};
	}
}
