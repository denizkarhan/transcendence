import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/service/users/users.service';

@Injectable()
export class LocalAuthService {
	constructor(private userService: UsersService,private jwtService: JwtService){}

	async validateUser(username: string, pass: string): Promise<any> {
		const user = await this.userService.getUserByLogin(username);

		if (user && user.Password === pass){
			const { Password, ...result } = user;
			return user;
		  }
		return null;
	}

	async login(user: any) {
		console.log(user);
		const newUser = await this.userService.getUserByLogin(user.username);
		console.log(newUser);
		const payload = { username: newUser.Login, sub: newUser.Id };
		return {
		  access_token: this.jwtService.sign(payload),
		};
	}
}
