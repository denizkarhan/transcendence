import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from '../local-auth/constants';
import { FtAuthController } from './controllers/ft-auth.controller';
import { FtAuthService } from './service/ft-auth.service';
import { FtStrategy } from './utils/ft-auth.strategy';

@Module({
	imports: [UsersModule, JwtModule.register({
		secret: jwtConstants.secret,
		signOptions: { expiresIn: '15m' },
	})],
  controllers: [FtAuthController],
  providers: [FtAuthService, FtStrategy],
  exports: [FtAuthService]
})
export class FtAuthModule {}
