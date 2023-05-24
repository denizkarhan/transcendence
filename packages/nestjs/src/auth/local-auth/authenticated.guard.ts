import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";


@Injectable()
export class AuthenticatedGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const request =context.switchToHttp().getRequest();

		const result = request.isAuthenticated();
		
        if (result)
			return result;
		throw new HttpException('Giremen', HttpStatus.UNAUTHORIZED);
    }
}
