import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/service/users/users.service';
import * as bcrypt from 'bcrypt';
import { Socket } from 'socket.io';
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
		const payload = { username: newUser.Login, sub: newUser.Id };
		return {
		  access_token: this.jwtService.sign(payload),
		};
	}

	async getUserFromSocket(client: Socket) {
		const authorization = client.handshake.headers.authorization;
		const token = authorization && authorization.split(' ')[1];
		if (!token) return null;

		const payload = this.jwtService.verify(token);
		if (!payload) return null;

		const user = await this.userService.findById(payload.Id);
		if (!user) return null;

		return user;
	}
}
