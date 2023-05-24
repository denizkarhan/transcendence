import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtAuthGuard } from "../local-auth/jwt-auth.guard";
import { FtAuthGuard } from "../ft-auth/utils/ft-auth.guard";
import { GoogleAuthGuard } from "../Google/utils/Guards";


@Injectable()
export class AuthenticatedGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
		// const jwtAuht = new JwtAuthGuard();
		// const ftAuth = new FtAuthGuard();
		// const googleAuth = new GoogleAuthGuard();
		
		const local = request.isAuthenticated();
		// const jwt = jwtAuht.canActivate(context);
		// const ft = ftAuth.canActivate(context);
		// const google = googleAuth.canActivate(context);
		if (local)
			return true;
		// console.log(result);
        // if (result)
		// 	return result;
		return false;
    }
}
