import { Controller, Get, Param, Post, Request, Res, UnauthorizedException } from '@nestjs/common';
import { AuthanticaterService } from '../../service/authanticater/authanticater.service';
import { UsersService } from 'src/users/service/users/users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/users/utils/metadata';
import * as qrcode from 'qrcode';

@ApiTags('2FA')
@Controller('authanticater')
@ApiBearerAuth()
export class AuthanticaterController {
	constructor(private authanticaterService: AuthanticaterService, private userService: UsersService) { }

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
				return await this.authanticaterService.Login(user);
		}
		throw new UnauthorizedException();
	}
}
