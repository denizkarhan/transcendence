import { Controller, Get, Param, Post, Request, Res, UnauthorizedException } from '@nestjs/common';
import { AuthanticatorService } from '../../service/authanticator/authanticator.service';
import { UsersService } from 'src/users/service/users/users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/utils/metadata';
import * as qrcode from 'qrcode';
import * as bcrypt from 'bcrypt';

@ApiTags('2FA')
@Controller('authanticator')
@ApiBearerAuth()
export class AuthanticatorController {
	constructor(private authanticatorService: AuthanticatorService, private userService: UsersService) { }

	@Get('enable2fa')
	async enableTwoFactor(@Request() req, @Res() res) {
		const user = await this.userService.getUserByLogin(req.user.Login);
		const tfa = await this.authanticatorService.generateTwoFactorAuthenticationSecret(user);
		const qrCodeBuffer = await qrcode.toBuffer(tfa.qrCode);
		res.set('Content-type', 'image/png');
		res.send(qrCodeBuffer);
	}

	@Get('verify/:token/:username')
	@Public()
	async verifyToken(@Param('token') token: string, @Param('username') username: string) {
		const user = await this.userService.getUserByLogin(username);
		console.log("------------->",user);
		console.log("--------------->",token);
		if (!user.TwoFactorAuth)
			throw new UnauthorizedException();
		const result = this.authanticatorService.verifyTwoFactorAuthentication(token, user.TwoFactorSecret);
		console.log(result);
		if (result)
			return await this.authanticatorService.Login(user);
		throw new UnauthorizedException();
	}
}

