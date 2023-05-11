import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UserMapper } from 'src/users/dtos/UserMapper';
import { UsersService } from 'src/users/service/users/users.service';

@Controller('users')
export class UsersController {

	constructor(private userService: UsersService, private userMapper: UserMapper){}

	@Get(':userName')
	async getUserByName(@Param('userName') userName: string) {
		const user = await this.userService.getUserByName(userName);
		return this.userMapper.toDto(user);
	}

	@Post()
	@UsePipes(new ValidationPipe())
	createUser(@Body() createUserDto : CreateUserDto) {
		this.userService.createUser(createUserDto);
	}

}
