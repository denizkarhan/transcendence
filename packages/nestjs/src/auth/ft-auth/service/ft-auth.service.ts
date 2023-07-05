import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthService } from 'src/auth/local-auth/local-auth.service';
import { Avatar } from 'src/typeorm/entities/avatar';
import { UploadsService } from 'src/uploads/uploads.service';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { SerializedUser } from 'src/users/dtos/UserMapper';
import { UsersService } from 'src/users/service/users/users.service';

@Injectable()
export class FtAuthService {
	constructor(private userService : UsersService, private localAuth : LocalAuthService, private imageService: UploadsService){}

	async validateUser(details: CreateUserDto, imagePath: string){
		var user = await this.userService.getUserByEmail(details.Email);
		if (user) return user;
		const isUser = await this.userService.createUser(details);
		if (isUser)
			user = isUser
		else
			return null;
		const ava = new Avatar;
		ava.name = '42';
		ava.path = imagePath;
		ava.user = user;
		this.imageService.createImage(ava);
		return user;
	}

	async login(user: any) {
		return await this.localAuth.login({username:user.Login});
	}
}
