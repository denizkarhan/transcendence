import { Body, Controller, Get, Post, Request, UseFilters, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth/local-auth.guard';
import { ExceptionHandleFilter } from './exception-handle/exception-handle.filter';
import { LocalAuthService } from './auth/local-auth/local-auth.service';
// import { JwtAuthGuard } from './auth/local-auth/jwt-auth.guard';
import { SignInDto } from './users/dtos/SignIn.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: LocalAuthService) {}

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() signDto : SignInDto) {
    return this.authService.login(signDto);
  }

//   @UseGuards(JwtAuthGuard)
//   @Get('profile')
//   getProfile(@Request() req) {
//     return req.user;
//   }
}
