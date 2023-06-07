import { Body, Controller, Get, Post, Req, Request, Res, UseFilters, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth/local-auth.guard';
import { ExceptionHandleFilter } from './exception-handle/exception-handle.filter';
import { LocalAuthService } from './auth/local-auth/local-auth.service';
// import { JwtAuthGuard } from './auth/local-auth/jwt-auth.guard';
import { SignInDto } from './users/dtos/SignIn.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './users/utils/metadata';
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
		const result = await this.authService.register(createUserDto);
		if (result)
			return { msg: 'OK', status: 200 };
	}

	@Get('auth/logout')
	// @Public()
	async logout(@Request() req) {
		console.log(req.user);
		await this.authService.logout(req.user);
	}
}
// {"FirstName":"Deniz", "LastName":"Karhan", "Email":"a11sd1@asd.com", "Password":"ASDasd123!.", "Login":"dkarhan", "TwoFactorAuth":true}
