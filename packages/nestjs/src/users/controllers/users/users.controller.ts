import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Req, UseFilters, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ExceptionHandleFilter } from 'src/exception-handle/exception-handle.filter';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { SerializedUser } from 'src/users/dtos/UserMapper';
import { UsersService } from 'src/users/service/users/users.service';
import { UpdateUserParams } from 'src/users/utils/types';
import { Request } from 'express';
import { ApiBody } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/auth/local-auth/authenticated.guard';


@Controller('users')
export class UsersController {

	constructor(private userService: UsersService){}

	@Get('all')
	@UseInterceptors(ClassSerializerInterceptor)
	@UseGuards(AuthenticatedGuard)
	async getUsers(){
		return await this.userService.getUsers();
	}

	@Get('userName/:userName')
	@UseFilters(ExceptionHandleFilter)
	@UseInterceptors(ClassSerializerInterceptor)
	@UseGuards(AuthenticatedGuard)
	async getUserByName(@Param('userName') userName: string) {
		const user = await this.userService.getUserByLogin(userName);
		if (!user) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
		return new SerializedUser(user);
	}

	@Get('email/:email')
	@UseFilters(ExceptionHandleFilter)
	@UseInterceptors(ClassSerializerInterceptor)
	@UseGuards(AuthenticatedGuard)
	async getUserByEmail(@Param('email') email: string) {
		const user = await this.userService.getUserByEmail(email);
		if (!user) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
		return new SerializedUser(user);
	}

	@Get('id/:id')
	@UseFilters(ExceptionHandleFilter)
	@UseInterceptors(ClassSerializerInterceptor)
	@UseGuards(AuthenticatedGuard)
	async getUserById(@Param('id') id: number) {
		const user = await this.userService.findById(id);
		if (!user) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
		return new SerializedUser(user);
	}

	@Post()
	@UsePipes(new ValidationPipe())
	@UseFilters(ExceptionHandleFilter)
	async createUser(@Body() createUserDto : CreateUserDto) {
		await this.userService.createUser(createUserDto);
	}

	@Post('update')
	@UseFilters(ExceptionHandleFilter)
	@ApiBody({}) // Body parametresi için Swagger açıklaması
	@UseGuards(AuthenticatedGuard)
	async updateUser(@Body() userDetail : UpdateUserParams, @Req() request: Request)
	{
		const if_update = await this.userService.updateUser(userDetail, request.user);
		if (if_update)
			return {msg:"Successfully", status: 200};
		throw new HttpException('Eksik Birşeyler var hayatında', HttpStatus.FORBIDDEN);
	}


}
