import {  Controller, Get, Req, Res, UseGuards, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleAuthGuard } from '../utils/Guards';
import { SignInDto } from 'src/users/dtos/SignIn.dto';
import { UsersService } from 'src/users/service/users/users.service';
import { UpdateUserParams } from 'src/users/utils/types';
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
	async handleRedirect(@Req() request: Request) {
		return await this.authService.login(request.user);
	}

	@Get('status')
	@Public()
	user(@Req() request: Request) {
		if (request.user)
			return { msg: 'Authanticated' };
		return { msg: 'Not Authanticated' };
	}
}
