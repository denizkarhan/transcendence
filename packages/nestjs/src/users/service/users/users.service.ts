import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/users';
import { CreateUserParams, UpdateUserParams } from 'src/utils/type';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

	constructor(@InjectRepository(User) private userRepository: Repository<User>, ){}

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

	createUser(userDetail: CreateUserParams){
		const newUser = this.userRepository.create({ 
			...userDetail,
			CreatedAt : new Date(),
			UpdatedAt : new Date(),
			Status: 0,
		});
		return this.userRepository.save(newUser);
	}

	updateUser(login:string, userDetail: UpdateUserParams)
	{
		return this.userRepository.update({Login:login},{...userDetail});
	}

}

