import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { FtAuthGuard } from '../utils/ft-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/utils/metadata';
import { FtAuthService } from '../service/ft-auth.service';
import { Request, Response } from 'express';

@Controller('ft-auth')
@ApiTags('ft-auth')
export class FtAuthController {
	constructor(private authService: FtAuthService) { }

	@Get('/login')
	@Public()
	@UseGuards(FtAuthGuard)
	handleLogin() {
		return { msg: 'Auth' };
	}

	@UseGuards(FtAuthGuard)
	@Public()
	@Get('/redirect')
	async handleRedirect(@Req() request: Request, @Res() response: Response) {
		const token = (await this.authService.login(request.user));
		const url = new URL("http://k2m13s05.42kocaeli.com.tr");
		url.port = "3000";
		url.pathname = 'login';
		if (token?.access_token)
			url.searchParams.set('token', token.access_token);
		else
			url.searchParams.set('user', token.Login);
		response.status(302).redirect(url.href);
	}
}
