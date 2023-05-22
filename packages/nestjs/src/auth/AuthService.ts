import { Injectable} from '@nestjs/common';
import { UsersService } from 'src/users/service/users/users.service';

@Injectable()
export class AuthService{
	constructor(protected userService: UsersService){}

	async findUser(id :number){
		return await this.userService.findById(id);
	}
}