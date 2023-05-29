import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import { LocalAuthService } from 'src/auth/local-auth/local-auth.service';
import { User } from 'src/typeorm/entities/users';
import { UsersService } from 'src/users/service/users/users.service';
import * as base32 from 'thirty-two';

@Injectable()
export class AuthanticaterService {
	constructor(private userService: UsersService,){} 	
	async generateTwoFactorAuthenticationSecret(user:User){
		const secret = speakeasy.generateSecret({length:20});
		await this.userService.updateUser({TwoFactorAuth:true, TwoFactorSecret:secret.base32}, user);
		const qrCode = speakeasy.otpauthURL({
			secret:secret.ascii,
			label: user.Login,
			issuer:'Ft_Transcendence',
		});
		return {qrCode, secret: secret.base32}
	}

	verifyTwoFactorAuthentication(twoFactorCode: string, userSecret:string): boolean {
		
		const verified = speakeasy.totp.verify({
		  secret: userSecret,
		  encoding: 'base32',
		  token: twoFactorCode,
		});
		return verified;
	  }
}
