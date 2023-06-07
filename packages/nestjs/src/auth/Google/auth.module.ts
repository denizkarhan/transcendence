import { Module } from '@nestjs/common';
import { AuthController } from './controllers/google-auth.controller';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { UsersModule } from 'src/users/users.module';
import { GoogleAuthService } from './service/google-auth.service';
import { LocalAuthModule } from '../local-auth/local-auth.module';
import { UploadsModule } from 'src/uploads/uploads.module';

@Module({
	imports:[UsersModule, LocalAuthModule, UploadsModule],
	controllers: [AuthController],
	providers: [GoogleAuthService, GoogleStrategy],
	exports: [GoogleAuthService]

})
export class AuthModule {}

