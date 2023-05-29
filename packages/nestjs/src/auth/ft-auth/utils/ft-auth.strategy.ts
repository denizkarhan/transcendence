import { ConsoleLogger, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile } from "passport";
import { Strategy } from "passport-42";
import { SerializedUser } from "src/users/dtos/UserMapper";
import { FtAuthService } from "../service/ft-auth.service";

@Injectable()
export class FtStrategy extends PassportStrategy(Strategy){
	constructor(private authService : FtAuthService){
		super({
			clientID: 'u-s4t2ud-83701d37bd325e3b25b4bb72166987bed8a35469e436c0f7e5b2e8b18f1d745a',
			clientSecret: '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',
			callbackURL: 'http://localhost:3001/ft-auth/redirect'
		});
	}

	async validate(accessToken: any, refreshToken: string, profile: Profile) {
		// console.log(accessToken);
		const user = await this.authService.validateUser({
			FirstName: profile.name.givenName,
			LastName: profile.name.familyName,
			Email: profile.emails[0].value,
			Login: profile.emails[0].value.split("@").at(0),
			Password: "Aasdas123123_123123.!"
			});
		return user;
	  }
}