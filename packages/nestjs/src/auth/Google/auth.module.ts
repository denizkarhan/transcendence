import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { SesssionSerialaize } from '../utils/Serialaizer';
import { UsersModule } from 'src/users/users.module';
import { GoogleAuthService } from './service/google-auth.service';

@Module({
	imports:[UsersModule],
	controllers: [AuthController],
	providers: [GoogleStrategy,
		SesssionSerialaize,
		{
			provide: 'AUTH_SERVICE',
			useClass: GoogleAuthService,
		}]

})
export class AuthModule {}

