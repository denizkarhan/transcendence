<<<<<<< HEAD
import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Req, Request, UseFilters, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ExceptionHandleFilter } from 'src/exception-handle/exception-handle.filter';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { SerializedUser } from 'src/users/dtos/UserMapper';
import { UsersService } from 'src/users/service/users/users.service';
import { UpdateUserParams } from 'src/users/utils/types';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/auth/local-auth/authenticated.guard';
import { IsStrongPassword } from 'class-validator';
=======
import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Param, Post, Request, UseFilters, UseInterceptors } from '@nestjs/common';
import { ExceptionHandleFilter } from 'src/exception-handle/exception-handle.filter';
import { SerializedUser } from 'src/users/dtos/UserMapper';
import { UsersService } from 'src/users/service/users/users.service';
import { UpdateUserParams } from 'src/users/utils/types';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
>>>>>>> main


@Controller('users')
@ApiTags('users')
export class UsersController {

	constructor(private userService: UsersService){}

	@Get('profile')
	@UseInterceptors(ClassSerializerInterceptor)
<<<<<<< HEAD
	@UseGuards(AuthenticatedGuard)
	async getProfile(@Request() req){
		const {Password, ...profile} = req.user;
		return profile;
=======
	@ApiBearerAuth()
	async getProfile(@Request() req){
		const user = await this.userService.getUser(req.user);
		return new SerializedUser(user);
>>>>>>> main
	}

	@Get('all')
	@UseInterceptors(ClassSerializerInterceptor)
<<<<<<< HEAD
	@UseGuards(AuthenticatedGuard)
=======
	@ApiBearerAuth()
>>>>>>> main
	async getUsers(){
		return await this.userService.getUsers();
	}

	@Get('userName/:userName')
	@UseFilters(ExceptionHandleFilter)
	@UseInterceptors(ClassSerializerInterceptor)
<<<<<<< HEAD
	@UseGuards(AuthenticatedGuard)
=======
	@ApiBearerAuth()
>>>>>>> main
	async getUserByName(@Param('userName') userName: string) {
		const user = await this.userService.getUserByLogin(userName);
		if (!user) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
		return new SerializedUser(user);
	}

	@Get('email/:email')
<<<<<<< HEAD
	@UseFilters(ExceptionHandleFilter)
	@UseInterceptors(ClassSerializerInterceptor)
	@UseGuards(AuthenticatedGuard)
=======
	@ApiBearerAuth()
	@UseFilters(ExceptionHandleFilter)
	@UseInterceptors(ClassSerializerInterceptor)
>>>>>>> main
	async getUserByEmail(@Param('email') email: string) {
		const user = await this.userService.getUserByEmail(email);
		if (!user) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
		return new SerializedUser(user);
	}

	@Get('id/:id')
	@UseFilters(ExceptionHandleFilter)
	@UseInterceptors(ClassSerializerInterceptor)
<<<<<<< HEAD
	@UseGuards(AuthenticatedGuard)
=======
	@ApiBearerAuth()
>>>>>>> main
	async getUserById(@Param('id') id: number) {
		const user = await this.userService.findById(id);
		if (!user) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
		return new SerializedUser(user);
	}

<<<<<<< HEAD
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
=======
	@Post('update')
	@UseFilters(ExceptionHandleFilter)
	@ApiBody({}) // Body parametresi için Swagger açıklaması
	@ApiBearerAuth()
>>>>>>> main
	async updateUser(@Body() userDetail : UpdateUserParams, @Request() request)
	{
		const if_update = await this.userService.updateUser(userDetail, request.user);
		if (if_update)
			return {msg:"Successfully", status: 200};
		throw new HttpException('Eksik Birşeyler var hayatında', HttpStatus.FORBIDDEN);
	}


}
