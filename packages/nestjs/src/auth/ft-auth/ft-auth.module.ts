import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { FtAuthController } from './controllers/ft-auth.controller';
import { FtAuthService } from './service/ft-auth.service';
import { FtStrategy } from './utils/ft-auth.strategy';
import { LocalAuthModule } from '../local-auth/local-auth.module';
import { UploadsModule } from 'src/uploads/uploads.module';

@Module({
	imports: [UsersModule, LocalAuthModule, UploadsModule],
  controllers: [FtAuthController],
  providers: [FtAuthService, FtStrategy],
  exports: [FtAuthService]
})
export class FtAuthModule {}
