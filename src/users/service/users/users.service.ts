import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/users';
import { CreateUserParams } from 'src/utils/type';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

	constructor(@InjectRepository(User) private userRepository: Repository<User>, ){}

	async findOne(username: string): Promise<User | undefined> {
		return this.userRepository.findOneBy({Login:username});
	  }
	async getUserIdByName(name:string){
		console.log("userName: " + name);
		const user = await this.userRepository.findOneBy({Login:name});
		console.log(user);
		if (user != null)
			return user.Id;
		return 0;
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
}

