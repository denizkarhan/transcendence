import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as speakeasy from 'speakeasy';
import { User } from 'src/typeorm/entities/users';
import { UsersService } from 'src/users/service/users/users.service';

@Injectable()
export class AuthanticatorService {
	constructor(private userService: UsersService, private jwtService: JwtService) { }

	async generateTwoFactorAuthenticationSecret(user: User) {
		const secret = speakeasy.generateSecret({ length: 20 });
		await this.userService.updateUser({ TwoFactorAuth: true, TwoFactorSecret: secret.base32 }, user);
		const qrCode = speakeasy.otpauthURL({
			secret: secret.ascii,
			label: user.Login,
			issuer: 'Ft_Transcendence',
		});
		return { qrCode, secret: secret.base32 }
	}

	verifyTwoFactorAuthentication(twoFactorCode: string, userSecret: string): boolean {

		const verified = speakeasy.totp.verify({
			secret: userSecret,
			encoding: 'base32',
			token: twoFactorCode,
		});
		return verified;
	}

	async Login(user:User)
	{
		user = (await this.userService.updateUser({Status:'online'}, user)).data;
		return { access_token: await this.jwtService.sign({ Login: user.Login, Id: user.Id , Status: user.Status}) };
	}
}
