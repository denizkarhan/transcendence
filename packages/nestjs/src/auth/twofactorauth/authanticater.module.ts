import { Module } from '@nestjs/common';
import { AuthanticaterController } from './controllers/authanticater/authanticater.controller';
import { AuthanticaterService } from './service/authanticater/authanticater.service';
import { UsersModule } from 'src/users/users.module';
import { LocalAuthModule } from '../local-auth/local-auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../local-auth/constants';

@Module({
	imports: [UsersModule, JwtModule.register({
		secret: jwtConstants.secret,
		// signOptions: { expiresIn: '15m' },
	}),],
	controllers: [AuthanticaterController],
	providers: [AuthanticaterService],
	exports: [AuthanticaterService]
})
export class AuthanticaterModule { }
