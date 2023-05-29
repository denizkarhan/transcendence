import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { FtAuthGuard } from '../utils/ft-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/users/utils/metadata';
import { FtAuthService } from '../service/ft-auth.service';
import { Request } from 'express';

@Controller('ft-auth')
@ApiTags('ft-auth')
export class FtAuthController {
	constructor(private authService: FtAuthService){}

	@Get('/login')
	@Public()
	@UseGuards(FtAuthGuard)
	handleLogin() {
		return { msg: 'Auth' };
	}

	@UseGuards(FtAuthGuard)
	@Public()
	@Get('/redirect')
	async handleRedirect(@Req() req : Request) {
		return await this.authService.login(req.user)
	}
}
