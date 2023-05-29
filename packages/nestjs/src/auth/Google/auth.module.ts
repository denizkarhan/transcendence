import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { SesssionSerialaize } from '../utils/Serialaizer';
import { UsersModule } from 'src/users/users.module';
import { GoogleAuthService } from './service/google-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../local-auth/constants';

@Module({
	imports:[UsersModule, JwtModule.register({
		secret: jwtConstants.secret,
		signOptions: { expiresIn: '15m' },
	})],
	controllers: [AuthController],
	providers: [GoogleAuthService, GoogleStrategy],
	exports: [GoogleAuthService]

})
export class AuthModule {}

