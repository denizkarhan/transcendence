import { Inject, Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthService } from 'src/auth/local-auth/local-auth.service';
import { Avatar } from 'src/typeorm/entities/avatar';
import { User } from 'src/typeorm/entities/users';
import { UploadsService } from 'src/uploads/uploads.service';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/service/users/users.service';

@Injectable()
export class GoogleAuthService{

	constructor(@Inject(UsersService) private userService: UsersService, private localAuth : LocalAuthService, private imageService: UploadsService){}

	async validateUser(details: CreateUserDto, imagePath:string ){
		var user = await this.userService.getUserByLogin(details.Login);
		if (user) return user;
		user = await this.userService.createUser(details);
		const ava = new Avatar;
		ava.name = 'Google';
		ava.path = imagePath;
		ava.user = user;
		await this.imageService.createImage(ava);
		return user;
	}

	async login(user: any) {
		return await this.localAuth.login({username:user.Login});
	}
}
