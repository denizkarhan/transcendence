import { HttpException, HttpStatus, Injectable, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { User } from 'src/typeorm/entities/users';
import { UpdateUserDto } from 'src/users/dtos/UpdateUserDto';
import { SerializedUser } from 'src/users/dtos/UserMapper';
import { CreateUserParams, UpdateUserParams } from 'src/users/utils/types';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LocalAuthService } from 'src/auth/local-auth/local-auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

	constructor(@InjectRepository(User) private userRepository: Repository<User>, private jwtService: JwtService) { }

	async getUsers() {
		return (await this.userRepository.find()).map((User) => plainToClass(SerializedUser, User));
	}

	async getUser(user: any) {
		return await this.userRepository.findOneBy({ Id: user.Id });
	}

	async getUserByEmail(email: string) {
		return await this.userRepository.findOneBy({ Email: email });
	}

	async getUserByLogin(name: string) {
		return await this.userRepository.findOneBy({ Login: name });
	}

	async findById(id: number) {
		return await this.userRepository.findOneBy({ Id: id });
	}


	async createUser(userDetail: CreateUserParams) {
		const newUser = this.userRepository.create({
			...userDetail,
			CreatedAt: new Date(),
			UpdatedAt: new Date(),
			Status: 'offline',
		});
		const saltOrRounds = await bcrypt.genSalt();
		newUser.Password = await bcrypt.hash(newUser.Password, saltOrRounds);
		try {
			return await this.userRepository.save(newUser);
		} catch {
			throw new HttpException('Tekrar Eden Kayıt', HttpStatus.NO_CONTENT);
		}
	}

	async updateUser(userDetail: UpdateUserDto, user: any) {
		const oldUser = await this.userRepository.findOneBy({ Login: user.Login });
		const newUser = await this.userRepository.create({ ...oldUser, ...userDetail });
		const res = await this.userRepository.save(newUser);
		if (userDetail?.Login) {
			const payload = { Login: newUser.Login, Id: newUser.Id, Status: newUser.Status };
			return {
				access_token: await this.jwtService.sign(payload),
			};
		}
		return {data : res};
	}


}