import { Controller, Get, Param, Post, Request, Res, UnauthorizedException } from '@nestjs/common';
import { AuthanticaterService } from '../../service/authanticater/authanticater.service';
import { UsersService } from 'src/users/service/users/users.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/users/utils/metadata';
import * as qrcode from 'qrcode';

@Controller('authanticater')
@ApiTags('2FA')
export class AuthanticaterController {
	constructor(private authanticaterService: AuthanticaterService, private userService:UsersService){}
	
	@Get('enable2fa')
	@Public()
	async enableTwoFactor(@Request() req, @Res() res){
		const user = await this.userService.getUserByLogin(req.user.Login);
		const tfa = await this.authanticaterService.generateTwoFactorAuthenticationSecret(user);
		console.log(tfa.qrCode);
		const qrCodeBuffer = await qrcode.toBuffer(tfa.qrCode);
		res.set('Content-type', 'image/png');
		res.send(qrCodeBuffer);
	}

	@Post(':token')
	@Public()
	async verifyToken(@Param('token') token:string, @Request() req){
		console.log(token);
		const user = await this.userService.getUserByLogin(req.user.Login);
		const result = this.authanticaterService.verifyTwoFactorAuthentication(token, user.TwoFactorSecret);
		if (result)
			return {msg:'OK', Status:200};
		throw new UnauthorizedException();
	}
}
