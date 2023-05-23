import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { FtAuthController } from './controllers/ft-auth.controller';
import { FtAuthService } from './service/ft-auth.service';
import { FtStrategy } from './utils/ft-auth.strategy';

@Module({
	imports: [UsersModule],
  controllers: [FtAuthController],
  providers: [FtAuthService, FtStrategy],
  exports: [FtAuthService]
})
export class FtAuthModule {}
