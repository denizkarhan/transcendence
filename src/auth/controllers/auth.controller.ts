import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { GoogleAuthGuard } from 'src/auth/utils/Guards';

@Controller('auth')
@ApiTags('auth')
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
