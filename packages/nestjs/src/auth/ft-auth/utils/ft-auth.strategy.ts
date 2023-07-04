import { ConsoleLogger, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile } from "passport";
import { Strategy } from "passport-42";
import { SerializedUser } from "src/users/dtos/UserMapper";
import { FtAuthService } from "../service/ft-auth.service";

@Injectable()
export class FtStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: FtAuthService) {
		super({
			clientID: 'u-s4t2ud-83701d37bd325e3b25b4bb72166987bed8a35469e436c0f7e5b2e8b18f1d745a',
			clientSecret: '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',
			callbackURL: 'http://k2m13s05.42kocaeli.com.tr:3001/ft-auth/redirect',
			scope: 'public'
		});
	}

	async validate(accessToken: any, refreshToken: string, profile: any) {
		const photo = profile._json.image.link;
		const user = await this.authService.validateUser({
			FirstName: profile.name.givenName,
			LastName: profile.name.familyName,
			Email: profile.emails[0].value,
			Login: profile.emails[0].value.split("@").at(0),
			Password: "Aasdas123123_123123.!"
		}, photo);
		return user;
	}
}