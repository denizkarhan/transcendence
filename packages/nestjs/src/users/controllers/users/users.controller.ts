import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Param, Post, Request, UseFilters, UseInterceptors } from '@nestjs/common';
import { ExceptionHandleFilter } from 'src/exception-handle/exception-handle.filter';
import { SerializedUser } from 'src/users/dtos/UserMapper';
import { UsersService } from 'src/users/service/users/users.service';
import { UpdateUserParams } from 'src/users/utils/types';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';


@Controller('users')
@ApiTags('users')
export class UsersController {

	constructor(private userService: UsersService){}

	@Get('profile')
	@UseInterceptors(ClassSerializerInterceptor)
	@ApiBearerAuth()
	async getProfile(@Request() req){
		const user = await this.userService.getUser(req.user);
		return new SerializedUser(user);
	}

	@Get('all')
	@UseInterceptors(ClassSerializerInterceptor)
	@ApiBearerAuth()
	async getUsers(){
		return await this.userService.getUsers();
	}

	@Get('userName/:userName')
	@UseFilters(ExceptionHandleFilter)
	@UseInterceptors(ClassSerializerInterceptor)
	@ApiBearerAuth()
	async getUserByName(@Param('userName') userName: string) {
		const user = await this.userService.getUserByLogin(userName);
		if (!user) throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
		return new SerializedUser(user);
	}

	@Get('email/:email')
	@ApiBearerAuth()
	@UseFilters(ExceptionHandleFilter)
	@UseInterceptors(ClassSerializerInterceptor)
	async getUserByEmail(@Param('email') email: string) {
		const user = await this.userService.getUserByEmail(email);
		if (!user) throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
		return new SerializedUser(user);
	}

	@Get('id/:id')
	@UseFilters(ExceptionHandleFilter)
	@UseInterceptors(ClassSerializerInterceptor)
	@ApiBearerAuth()
	async getUserById(@Param('id') id: number) {
		const user = await this.userService.findById(id);
		if (!user) throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
		return new SerializedUser(user);
	}

	@Post('update')
	@UseFilters(ExceptionHandleFilter)
	@ApiBody({}) // Body parametresi için Swagger açıklaması
	@ApiBearerAuth()
	async updateUser(@Body() userDetail : UpdateUserParams, @Request() request)
	{
		const if_update = await this.userService.updateUser(userDetail, request.user);
		if (if_update?.access_token)
			return if_update
		else if (if_update?.data)
			return {msg:"Successfully", status: 200};
		throw new HttpException('Eksik Birşeyler var hayatında', HttpStatus.FORBIDDEN);
	}


}
