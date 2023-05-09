import { Controller, Get, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from 'src/auth/utils/Guards';

@Controller('auth')
export class AuthController {

	@Get('google/login')
	@UseGuards(GoogleAuthGuard)
	handleLogin(){
		return {msg: 'Google Auth'};
	}

	@Get('google/redirect')
	@UseGuards(GoogleAuthGuard)
	handleRedirect(){
		return  {msg: 'OK'};
	}
}
