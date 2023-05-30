import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Request } from '@nestjs/common';
import { jwtConstants } from '../local-auth/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
		  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		  ignoreExpiration: false,
		  secretOrKey: jwtConstants.secret,
		});
	  }
	
	  async validate(payload: any) {
		const isActive = payload.Status;
		if (isActive === 'online')
			return { Id: payload.Id, Login: payload.Login, Status: payload.Status };
		else
			return null;
	  }
}