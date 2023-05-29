import {  Controller, Get, Req, Res, UseGuards, Body, Request } from '@nestjs/common';
import { GoogleAuthGuard } from '../utils/Guards';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/users/utils/metadata';
import { GoogleAuthService } from '../service/google-auth.service';

@Controller('auth')
@ApiTags('google-auth')
export class AuthController {

	constructor (private authService : GoogleAuthService){}

	@Get('google/login')
	@Public()
	@UseGuards(GoogleAuthGuard)
	handleLogin() {
		return { msg: 'Google Auth' };
	}

	@UseGuards(GoogleAuthGuard)
	@Public()
	@Get('google/redirect')
	async handleRedirect(@Request() request) {
		return await this.authService.login(request.user);
	}

	@Get('status')
	@Public()
	user(@Request() request) {
		if (request.user)
			return { msg: 'Authanticated' };
		return { msg: 'Not Authanticated' };
	}
}
