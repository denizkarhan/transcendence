import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class ExceptionHandleFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
	const context = host.switchToHttp();
	const response = context.getResponse<Response>();
	const status = exception.getStatus();

	response.status(status).send({
		status:status,
		message: exception.getResponse()
	});
  }
}
