import { Controller, Get, Param, Post, Request, Res, UnauthorizedException } from '@nestjs/common';
import { AuthanticaterService } from '../../service/authanticater/authanticater.service';
import { UsersService } from 'src/users/service/users/users.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/users/utils/metadata';
import * as qrcode from 'qrcode';
import { JwtService } from '@nestjs/jwt';

@Controller('authanticater')
@ApiTags('2FA')
export class AuthanticaterController {
	constructor(private authanticaterService: AuthanticaterService, private userService: UsersService, private jwtService: JwtService) { }

	@Get('enable2fa')
	async enableTwoFactor(@Request() req, @Res() res) {
		const user = await this.userService.getUserByLogin(req.user.Login);
		const tfa = await this.authanticaterService.generateTwoFactorAuthenticationSecret(user);
		const qrCodeBuffer = await qrcode.toBuffer(tfa.qrCode);
		res.set('Content-type', 'image/png');
		res.send(qrCodeBuffer);
	}

	@Post('verify/:token')
	@Public()
	async verifyToken(@Param('token') token: string, @Request() req) {
		if (req.user) {
			const user = await this.userService.getUserByLogin(req.user.Login);
			if (!user.TwoFactorAuth)
				return;
			const result = this.authanticaterService.verifyTwoFactorAuthentication(token, user.TwoFactorSecret);
			if (result)
				return { access_token: await this.jwtService.sign({ Login: user.Login, Id: user.Id }) };
		}
		throw new UnauthorizedException();
	}
}
