import { HttpException, HttpStatus, Injectable, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { User } from 'src/typeorm/entities/users';
import { UpdateUserDto } from 'src/users/dtos/UpdateUserDto';
import { SerializedUser } from 'src/users/dtos/UserMapper';
import { CreateUserParams, UpdateUserParams } from 'src/users/utils/types';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

	constructor(@InjectRepository(User) private userRepository: Repository<User> ){}

	async getUsers(){
		return (await this.userRepository.find()).map((User)=>plainToClass(SerializedUser, User));
	}

	async getUser(user:any)
	{
		return await this.userRepository.findOneBy({Id:user.userId});
	}

	async getUserByEmail(email:string){
		return await this.userRepository.findOneBy({Email:email});
	}

	async getUserByLogin(name:string){
		return await this.userRepository.findOneBy({Login:name});
	}

	async findById(id :number){
		return await this.userRepository.findOneBy({Id:id});
	}

	async createUser(userDetail: CreateUserParams){
		const newUser = this.userRepository.create({ 
			...userDetail,
			CreatedAt : new Date(),
			UpdatedAt : new Date(),
			Status: 0,
		});
		const saltOrRounds = await bcrypt.genSalt();
		newUser.Password = await bcrypt.hash(newUser.Password, saltOrRounds);
		if (await this.userRepository.exist({where: {Email: newUser.Email, Login: newUser.Login}}))
			throw new HttpException('User exists', HttpStatus.FOUND);
		return this.userRepository.save(newUser);
	}

	async updateUser(userDetail: UpdateUserDto, user:any)
	{
		const oldUser = await this.userRepository.findOneBy({Login:user.Login});
		
		
		const newUser = await this.userRepository.create({...oldUser, ...userDetail});
		newUser.UpdatedAt = new Date();
		return await this.userRepository.save(newUser);
		// console.log("-------------------------------");
		// console.log(updatedUser);
		// console.log("-------------------------------");
		// if (updatedUser)
	}

}

// {"username":"aceitn", "password":"qwer!'^!'^SDFSDFSDF."}
// {"FirstName":"Alooo", "LastName":"yaram", "Password":"qwer!'^!'^SDFSDFSDF.", "Email":"asd@asd.com" }
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFjZWl0biIsInN1YiI6MSwiaWF0IjoxNjg0NDE0MTEzLCJleHAiOjE2ODQ0MTUwMTN9.6DYXSP0CpyQGROVoEXDIdwsCO223aq674gpLPR1ZS4Y