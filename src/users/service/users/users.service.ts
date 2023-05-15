import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { User } from 'src/typeorm/entities/users';
import { SerializedUser } from 'src/users/dtos/UserMapper';
import { CreateUserParams, UpdateUserParams } from 'src/users/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

	constructor(@InjectRepository(User) private userRepository: Repository<User> ){

	}

	async getUsers(){
		return (await this.userRepository.find()).map((User)=>plainToClass(SerializedUser, User));
	}

	async getUserByEmail(email:string){
		return await this.userRepository.findOneBy({Email:email});
	}
	
	async getUserByName(name:string){
		return await this.userRepository.findOneBy({Login:name});
	}

	async getUserById(id :number){
		const user = await this.userRepository.findOneBy({Id:id});
		return user;
	}

	async createUser(userDetail: CreateUserParams){
		const newUser = this.userRepository.create({ 
			...userDetail,
			CreatedAt : new Date(),
			UpdatedAt : new Date(),
			Status: 0,
		});
		if (await this.userRepository.exist({where: {Email: newUser.Email, Login: newUser.Login}}))
			return 0;
		return this.userRepository.save(newUser);
		// const user  = this.userRepository.save(newUser);
		// return user;
	}

	updateUser(login:string, userDetail: UpdateUserParams)
	{
		return this.userRepository.update({Login:login},{...userDetail});
	}

}

