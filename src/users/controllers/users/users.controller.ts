import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, NotFoundException, Param, Post, UseFilters, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ExceptionHandleFilter } from 'src/exception-handle/exception-handle.filter';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { SerializedUser } from 'src/users/dtos/UserMapper';
import { UsersService } from 'src/users/service/users/users.service';

@Controller('users')
export class UsersController {

	constructor(private userService: UsersService){}

	@Get('all')
	@UseInterceptors(ClassSerializerInterceptor)
	async getUsers(){
		return await this.userService.getUsers();
	}

	@Get(':userName')
	@UseFilters(ExceptionHandleFilter)
	@UseInterceptors(ClassSerializerInterceptor)
	async getUserByName(@Param('userName') userName: string) {
		const user = await this.userService.getUserByName(userName);
		if (!user) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
		return new SerializedUser(user);
	}

	@Post()
	@UsePipes(new ValidationPipe())
	@UseFilters(ExceptionHandleFilter)
	createUser(@Body() createUserDto : CreateUserDto) {
		const user = this.userService.createUser(createUserDto);
		console.log(user);
		if (!user) console.log("asdasdas");//throw new HttpException('User Exist', HttpStatus.FOUND);
	}

}
