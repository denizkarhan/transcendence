import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { GoogleAuthService } from "../service/google-auth.service";


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: GoogleAuthService) {
		super({
			clientID: '421386662224-rrhk0f2lksmkt753ho7hr6gjlc3geqq7.apps.googleusercontent.com',
			clientSecret: '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',
			callbackURL: 'http://localhost:3001/auth/google/redirect',
			scope: ['profile', 'email'],
		});
	}

	async validate(accessToken: any, refreshToken: string, profile: Profile) {
		const user = await this.authService.validateUser({
			FirstName: profile.name.givenName,
			LastName: profile.name.familyName,
			Email: profile.emails[0].value,
			Login: profile.emails[0].value.split("@").at(0),
			Password: "Aasdas123123_123123.!"
		}, profile.photos[0].value);
		return user;
	}
}