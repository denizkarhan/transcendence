import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard(['jwt','local']) {
	canActivate(context: ExecutionContext) {
		return super.canActivate(context);
	  }
	
	  handleRequest(err:any , user:any) {
		if (err || !user) {
		  throw err || new UnauthorizedException();
		}
		return user;
	  }
}
