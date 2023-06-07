import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { FtAuthGuard } from '../utils/ft-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/users/utils/metadata';
import { FtAuthService } from '../service/ft-auth.service';
import { Request, Response } from 'express';

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
	async handleRedirect(@Req() request : Request, @Res() response: Response) {
		const token = (await this.authService.login(request.user));
		const url = new URL("http://localhost:3000/login");
		url.port = "3000";
		url.pathname = 'login';
		if (token?.access_token)
			response.cookie('token', token.access_token);
		else
			response.cookie('user', token.Login);
		response.status(302).redirect(url.href);
	}
}
