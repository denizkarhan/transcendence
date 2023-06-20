import { Controller, Get, Req, Res, UseGuards, Body, Request, Redirect } from '@nestjs/common';
import { GoogleAuthGuard } from '../utils/Guards';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/users/utils/metadata';
import { GoogleAuthService } from '../service/google-auth.service';
import { Response } from 'express';

@Controller('auth')
@ApiTags('google-auth')
export class AuthController {

	constructor(private authService: GoogleAuthService) { }

	@Get('google/login')
	@Public()
	@UseGuards(GoogleAuthGuard)
	async handleLogin() {
	}


	@UseGuards(GoogleAuthGuard)
	@Public()
	@Get('google/redirect')
	async handleRedirect(@Request() request, @Res() response: Response) {
		const token = (await this.authService.login(request.user));
		const url = new URL("http://k2m13s05.42kocaeli.com.tr");
		url.port = "3000";
		url.pathname = 'login';
		if (token?.access_token)
			url.searchParams.set('token', token.access_token);
		else
			url.searchParams.set('user', token.Login);
		response.status(302).redirect(url.href);
	}

	@Get('status')
	@Public()
	user(@Request() request) {
		if (request.user)
			return { msg: 'Authanticated' };
		return { msg: 'Not Authanticated' };
	}
}
