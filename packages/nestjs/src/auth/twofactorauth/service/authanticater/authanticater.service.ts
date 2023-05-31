import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import { User } from 'src/typeorm/entities/users';
import { UsersService } from 'src/users/service/users/users.service';
// import * as base32 from 'thirty-two';

@Injectable()
export class AuthanticaterService {
	constructor(private userService: UsersService){} 	
	async generateTwoFactorAuthenticationSecret(user:User){
		const secret = speakeasy.generateSecret({length:20});
		console.log(secret.base32);
		await this.userService.updateUser({TwoFactorAuth:true, TwoFactorSecret:secret.base32}, user);
		const qrCode = speakeasy.otpauthURL({
			secret:secret.base32,
			label:'Ft_Transcendence',
		});
		return {qrCode, secret: secret.base32}
	}

	verifyTwoFactorAuthentication(twoFactorCode: string, userSecret:string): boolean {
		console.log(twoFactorCode, userSecret);
		const verified = speakeasy.totp.verify({
		  secret: userSecret,
		  encoding: 'base32',
		  token: twoFactorCode,
		});
		console.log(verified);
		return verified;
	  }
}
