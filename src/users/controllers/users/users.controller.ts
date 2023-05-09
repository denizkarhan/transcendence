import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/service/users/users.service';

@Controller('users')
export class UsersController {

	constructor(private userService: UsersService){}

	@Get(':userName')
	getUserByName(@Param('userName') userName: string) {
		this.userService.getUserIdByName(userName);
	}

	@Post()
	@UsePipes(new ValidationPipe())
	createUser(@Body() createUserDto : CreateUserDto) {
		this.userService.createUser(createUserDto);
	}

}
