import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { catchError, tap } from 'rxjs/operators';
import { IncomingHttpHeaders } from 'http';

@Injectable()
export class RequestLogInterceptor implements NestInterceptor {
  logger: Logger = new Logger(RequestLogInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const requestStartAt = Date.now();
    const response = context.switchToHttp().getResponse<Response>();
    const { headers, path, method, body, query, params } = context
      .switchToHttp()
      .getResponse<Request>();
    const requestPayload = {
      body,
      query,
      params,
    };
    const internalPayload = {
      headers,
    };
    const logString = this.getLogString(
      headers,
      method,
      path,
      requestPayload,
      internalPayload,
    );
    return next.handle().pipe(
      tap(() => this.logResult(logString, requestStartAt, response)),
      catchError((err) => this.logError(logString, requestStartAt, err)),
    );
  }

  private logResult = (
    logString: any,
    requestStartAt: number,
    response: Response,
  ) => {
    const responseMsg = {
      ...logString,
      response: {
        status: response['statusCode'],
        responseTime: Date.now() - requestStartAt,
      },
    };
    if (responseMsg.response.responseTime > 500) {
      this.logger.warn({
        ...responseMsg,
        warn: 'Long request',
      });
    } else {
      this.logger.log(responseMsg);
    }
  };

  private logError = (logString: any, requestStartAt: number, err) => {
    this.logger.error({
      ...logString,
      level: 'error',
      response: {
        status: err['statusCode'] ?? HttpStatus.INTERNAL_SERVER_ERROR,
        error: JSON.stringify(err),
        responseTime: Date.now() - requestStartAt,
      },
    });
    throw err;
  };

  private getLogString = (
    headers: IncomingHttpHeaders,
    method: string,
    path: string,
    requestPayload,
    internalPayload,
  ): any => ({
    requestPayload,
    requestPayloadString: JSON.stringify(requestPayload),
    protocol: 'http',
    module: RequestLogInterceptor.name,
    method: `${method} ${path}`,
    message: 'Incoming http request',
    internalPayload,
    internalPayloadString: JSON.stringify(internalPayload),
    level: 'debug',
    logType: 'request',
  });
}
