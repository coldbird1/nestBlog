import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpStatus,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // 从ExecutionContext中获取响应对象并读取状态码
        const originalCode = context.switchToHttp().getResponse().statusCode;
        // 如果状态码以2开头，则将其改为200
        const code =
          originalCode >= 200 && originalCode < 300 ? 200 : originalCode;
        const statusCode = typeof code === 'number' ? code : HttpStatus.OK;

        return {
          code: statusCode,
          data,
        };
      }),
    );
  }
}
