import { Controller, Get, UseGuards } from '@nestjs/common';
import { FtAuthGuard } from '../utils/ft-auth.guard';

@Controller('ft-auth')
export class FtAuthController {

	@Get('/login')
	@UseGuards(FtAuthGuard)
	handleLogin() {
		return { msg: 'Google Auth' };
	}

	@UseGuards(FtAuthGuard)
	@Get('/redirect')
	async handleRedirect() {
		return {msg: 'OK'};
	}
}
