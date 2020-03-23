import { ExecutionContext, Injectable, NestInterceptor, Logger, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IncomingMessage } from 'http';
import { get } from 'lodash';

@Injectable()
export class RequestInfoInterceptor implements NestInterceptor {
  private logger = new Logger('RequestInfoInterceptor');

  constructor(
    private readonly properties: string[] = [],
    private readonly containerKey: string = 'body',
    private readonly containerPropertyName: string = 'metadata'
  ) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: IncomingMessage = context.switchToHttp().getRequest();
    try {
      const rootProperty = {};
      this.properties.forEach(property => {
        rootProperty[property] = get(request, property);
      });
      request[this.containerKey][this.containerPropertyName] = rootProperty;
    } catch (error) {
      this.logger.error(error);
    }
    return next.handle();
  }
}
