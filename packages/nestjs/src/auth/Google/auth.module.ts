import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { SesssionSerialaize } from '../utils/Serialaizer';
import { UsersModule } from 'src/users/users.module';
import { GoogleAuthService } from './service/google-auth.service';
import { AuthService } from '../AuthService';

@Module({
	imports:[UsersModule],
	controllers: [AuthController],
	providers: [GoogleAuthService, GoogleStrategy],
	exports: [GoogleAuthService]

})
export class AuthModule {}

