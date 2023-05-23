import { Controller, Get, UseGuards } from '@nestjs/common';
import { FtAuthGuard } from '../utils/ft-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('ft-auth')
@ApiTags('ft-auth')
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
