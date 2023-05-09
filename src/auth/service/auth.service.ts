import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/users';
import { UsersService } from 'src/users/service/users/users.service';
import { CreateUserParams } from 'src/utils/type';

@Injectable()
export class AuthService {

	constructor(private readonly userService: UsersService){}

	validateUser(details: CreateUserParams){
		console.log('AuthService');
		console.log(details);
	}
}
