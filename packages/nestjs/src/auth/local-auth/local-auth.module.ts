import { Module } from '@nestjs/common';
import { LocalAuthService } from './local-auth.service';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { SesssionSerialaize } from '../utils/Serialaizer';
import { JwtStrategy } from './jwt.strategy';

@Module({
	imports: [UsersModule, JwtModule.register({
		secret: jwtConstants.secret,
		signOptions: { expiresIn: '15m' },
	}),],
	providers: [LocalAuthService, LocalStrategy, JwtStrategy],
	exports: [LocalAuthService]
})
export class LocalAuthModule { }
