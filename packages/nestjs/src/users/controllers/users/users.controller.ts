import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Req, Request, UseFilters, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ExceptionHandleFilter } from 'src/exception-handle/exception-handle.filter';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { SerializedUser } from 'src/users/dtos/UserMapper';
import { UsersService } from 'src/users/service/users/users.service';
import { UpdateUserParams } from 'src/users/utils/types';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/local-auth/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/utils/jwt-auth.guard';
import { GoogleAuthGuard } from 'src/auth/Google/utils/Guards';
import { FtAuthGuard } from 'src/auth/ft-auth/utils/ft-auth.guard';
import { Public } from 'src/users/utils/metadata';


@Controller('users')
@ApiTags('users')
export class UsersController {

	constructor(private userService: UsersService){}

	@Get('profile')
	@UseInterceptors(ClassSerializerInterceptor)
	// @UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async getProfile(@Request() req){
		// console.log(req.user);
		const user = await this.userService.getUser(req.user);
		return new SerializedUser(user);
	}

	@Get('all')
	@UseInterceptors(ClassSerializerInterceptor)
	// @UseGuards(JwtAuthGuard)
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
		if (!user) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
		return new SerializedUser(user);
	}

	@Get('email/:email')
	@ApiBearerAuth()
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
	@ApiBearerAuth()
	async getUserById(@Param('id') id: number) {
		const user = await this.userService.findById(id);
		if (!user) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
		return new SerializedUser(user);
	}

	// @Public()
	// @Post()
	// @UsePipes(new ValidationPipe())
	// async createUser(@Body() createUserDto : CreateUserDto, @Req() req) {
	// 	const result = await this.userService.createUser(createUserDto);
	// 	if (result)
	// 		req.login({username: createUserDto.Login, password: createUserDto.Password}, function (err){
	// 			if (err) {
	// 				throw new Error('Oturum açma hatası');
	// 			  }
	// 		});
	// 	return result;
	// }

	@Post('update')
	@UseFilters(ExceptionHandleFilter)
	@ApiBody({}) // Body parametresi için Swagger açıklaması
	// @UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async updateUser(@Body() userDetail : UpdateUserParams, @Request() request)
	{
		const if_update = await this.userService.updateUser(userDetail, request.user);
		if (if_update)
			return {msg:"Successfully", status: 200};
		throw new HttpException('Eksik Birşeyler var hayatında', HttpStatus.FORBIDDEN);
	}


}
