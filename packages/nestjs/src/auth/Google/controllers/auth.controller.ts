import {  Controller, Get, Req, Res, UseGuards, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleAuthGuard } from '../utils/Guards';
import { SignInDto } from 'src/users/dtos/SignIn.dto';
import { UsersService } from 'src/users/service/users/users.service';
import { UpdateUserParams } from 'src/users/utils/types';

@Controller('auth')
export class AuthController {
	constructor(private userService: UsersService){}

	@Get('google/login')
	@UseGuards(GoogleAuthGuard)
	handleLogin() {
		return { msg: 'Google Auth' };
	}

	@UseGuards(GoogleAuthGuard)
	@Get('google/redirect')
	async handleRedirect(@Body() signIn: SignInDto, @Req() request: Request) {
		return {msg: 'OK'};
	}

	@Get('status')
	user(@Req() request: Request) {
		if (request.user)
			return { msg: 'Authanticated' };
		return { msg: 'Not Authanticated' };
	}
}
