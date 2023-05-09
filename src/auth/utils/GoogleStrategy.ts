import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy){
	constructor(){
		super({
			clientID: '421386662224-rrhk0f2lksmkt753ho7hr6gjlc3geqq7.apps.googleusercontent.com',
			clientSecret: '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',
			callBackURL: 'http://localhost:3000/api/auth/google/redirect',
			scope: ['profile', 'email'], 
		});
	}

	async validate(accessToken: string, refreshToken: string, profile: Profile){
		console.log(accessToken);
		console.log(refreshToken);
		console.log(profile);
	}
}
//denizkarhann@gmail.com
//m.haksal@gmail.com cetn.abd@gmail.com