import {  Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { GoogleAuthGuard } from '../utils/Guards';

@Controller('auth')
export class AuthController {

	@Get('google/login')
	@UseGuards(GoogleAuthGuard)
	handleLogin() {
		return { msg: 'Google Auth' };
	}

	@Get('google/redirect')
	@UseGuards(GoogleAuthGuard)
	handleRedirect() {
		return { msg: 'Ok' };
	}

	@Get('status')
	user(@Req() request: Request) {
		// console.log(request.user);
		if (request.user)
			return { msg: 'Authanticated' };
		return { msg: 'Not Authanticated' };
	}
}
