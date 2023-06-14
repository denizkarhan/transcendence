import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { LocalAuthModule } from '../local-auth/local-auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../local-auth/constants';
import { AuthanticatorController } from './controllers/authanticater/authanticator.controller';
import { AuthanticatorService } from './service/authanticator/authanticator.service';

@Module({
	imports: [UsersModule, JwtModule.register({
		secret: jwtConstants.secret,
	}),],
	controllers: [AuthanticatorController],
	providers: [AuthanticatorService],
	exports: [AuthanticatorService]
})
export class AuthanticaterModule { }
