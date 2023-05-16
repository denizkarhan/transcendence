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

	@Get('userName/:userName')
	@UseFilters(ExceptionHandleFilter)
	@UseInterceptors(ClassSerializerInterceptor)
	async getUserByName(@Param('userName') userName: string) {
		const user = await this.userService.getUserByName(userName);
		if (!user) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
		return new SerializedUser(user);
	}

	@Get('email/:email')
	@UseFilters(ExceptionHandleFilter)
	@UseInterceptors(ClassSerializerInterceptor)
	async getUserByEmail(@Param('email') email: string) {
		const user = await this.userService.getUserByEmail(email);
		if (!user) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
		return new SerializedUser(user);
	}

	@Get('id/:id')
	@UseFilters(ExceptionHandleFilter)
	@UseInterceptors(ClassSerializerInterceptor)
	async getUserById(@Param('id') id: number) {
		const user = await this.userService.getUserById(id);
		if (!user) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
		return new SerializedUser(user);
	}


	@Post()
	@UsePipes(new ValidationPipe())
	@UseFilters(ExceptionHandleFilter)
	async createUser(@Body() createUserDto : CreateUserDto) {
		await this.userService.createUser(createUserDto);
	}

}
