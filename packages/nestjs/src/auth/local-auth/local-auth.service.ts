import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/service/users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
@Injectable()
export class LocalAuthService{
	constructor(private userService: UsersService, private jwtService: JwtService){
	}

	async validateUser(username: string, pass: string): Promise<any> {
		const user = await this.userService.getUserByLogin(username);
		if (user && await bcrypt.compare(pass, user.Password)){
			const { Password, ...result } = user;
			return result;
		  }
		return null;
	}

	async login(user: any) {
		const newUser = await this.userService.getUserByLogin(user.username);
		if (newUser.TwoFactorAuth)
			return {Status:307, Url:'http://localhost:3001/authanticater/verify'};
		const payload = { Login: newUser.Login, Id: newUser.Id };
		return {
		  access_token: this.jwtService.sign(payload),
		};
	}

	async register(createUserDto: CreateUserDto){
		return await this.userService.createUser(createUserDto);
	}
}