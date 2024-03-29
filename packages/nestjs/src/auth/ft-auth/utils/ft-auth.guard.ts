import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class FtAuthGuard extends AuthGuard('42') {
	async canActivate(context: ExecutionContext) {
		const result = (await super.canActivate(context)) as boolean;

		const request = context.switchToHttp().getRequest();
		await super.logIn(request);

		return result;
	}
}