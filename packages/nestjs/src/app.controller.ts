import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Request, Res, UseFilters, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth/local-auth.guard';
import { ExceptionHandleFilter } from './exception-handle/exception-handle.filter';
import { LocalAuthService } from './auth/local-auth/local-auth.service';
// import { JwtAuthGuard } from './auth/local-auth/jwt-auth.guard';
import { SignInDto } from './users/dtos/SignIn.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './utils/metadata';
import { CreateUserDto } from './users/dtos/CreateUser.dto';
import { Response } from 'express';

@Controller()
@ApiTags('app')
export class AppController {
	constructor(private readonly appService: AppService, private authService: LocalAuthService) { }

	@Get('/')
	@Public()
	getHello(): string {
		return this.appService.getHello();
	}

	@Public()
	@UseGuards(LocalAuthGuard)
	@Post('auth/login')
	async login(@Body() signDto: SignInDto) {
		const token = (await this.authService.login(signDto));
		if (token?.access_token)
			return token;
		else {
			return {username:token.Login};
		}
	}

	@Public()
	@Post('auth/register')
	async createUser(@Body() createUserDto: CreateUserDto) {
		const response =  await this.authService.register(createUserDto);
		if (!response)
			throw new HttpException('Some Thing Is Wrong', HttpStatus.FORBIDDEN)
			// return {message:'Some Thing Is Wrong', status:HttpStatus.NO_CONTENT};
		return {message:'OK', status:HttpStatus.OK};
		
	}

	@Get('auth/logout')
	// @Public()
	async logout(@Request() req) {
		await this.authService.logout(req.user);
	}
}
// {"FirstName":"Deniz", "LastName":"Karhan", "Email":"a11sd1@asd.com", "Password":"ASDasd123!.", "Login":"dkarhan", "TwoFactorAuth":true}