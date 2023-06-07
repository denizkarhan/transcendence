import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { UsersService } from 'src/users/service/users/users.service';

@Injectable()
export class AuthanticaterService {

	constructor(private jwtService: JwtService, private userService: UsersService) {}

	public getTwoFactorAuthenticationCode(){
		
	}


	
}
