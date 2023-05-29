import { Body, Controller, Get, Post, Req, Request, UseFilters, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth/local-auth.guard';
import { ExceptionHandleFilter } from './exception-handle/exception-handle.filter';
import { LocalAuthService } from './auth/local-auth/local-auth.service';
// import { JwtAuthGuard } from './auth/local-auth/jwt-auth.guard';
import { SignInDto } from './users/dtos/SignIn.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './users/utils/metadata';
import { CreateUserDto } from './users/dtos/CreateUser.dto';

@Controller()
@ApiTags('app')
export class AppController {
	constructor(private readonly appService: AppService, private authService: LocalAuthService) { }

	@Get('/')
	getHello(): string {
		return this.appService.getHello();
	}

	@Public()
	@UseGuards(LocalAuthGuard)
	@Post('auth/login')
	async login(@Body() signDto: SignInDto) {
		return await this.authService.login(signDto);
	}

	@Public()
	@Post('auth/register')
	async createUser(@Body() createUserDto: CreateUserDto, @Req() req) {
		const result = await this.authService.register(createUserDto);
		// const url = new URL(`${req.protocol}:${req.hostname}`);
		//     url.port = "3001";
		//     url.pathname = 'login';
		//     url.searchParams.set('code', token);
		//     response.status(302).redirect(url.href);
		if (result)
			return { msg: 'OK', status: 200 };
	}
}
// {"FirstName":"Deniz", "LastName":"Karhan", "Email":"a11sd1@asd.com", "Password":"ASDasd123!.", "Login":"dkarhan", "TwoFactorAuth":true}