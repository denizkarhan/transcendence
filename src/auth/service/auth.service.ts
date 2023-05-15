import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/service/users/users.service';
import { CreateUserParams } from 'src/users/utils/types';

@Injectable()
export class AuthService {

	constructor(private userService: UsersService){}

	async validateUser(details: CreateUserParams){
		const user = await this.userService.getUserByEmail(details.Email);
		if (user) return user;
		return this.userService.createUser(details);
	}

	async findUser(id :number){
		return await this.userService.getUserById(id);
	}
}