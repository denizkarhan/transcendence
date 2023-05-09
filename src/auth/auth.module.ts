import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { AuthService } from './service/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/users';
import { UsersService } from 'src/users/service/users/users.service';

@Module({
	imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [GoogleStrategy, AuthService, UsersService, 
	{
		provide: 'AUTH_SERVICE',
		useClass: AuthService,
  }]
})
export class AuthModule {}
