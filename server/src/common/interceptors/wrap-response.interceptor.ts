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
        //有封装好的返回内容则直接返回
        if (data?.response) {
          return {
            code: data.response.statusCode,
            data: data.response.data,
            msg: data.response.message,
          };
        }

        // 从ExecutionContext中获取响应对象并读取状态码
        const originalCode = context.switchToHttp().getResponse().statusCode;

        // 如果状态码以2开头，则将其改为200
        const code =
          originalCode >= 200 && originalCode < 300 ? 200 : originalCode;
        let statusCode = typeof code === 'number' ? code : HttpStatus.OK;

        // 检查data是否为对象且包含msg属性
        if (typeof data === 'object' && data !== null && 'msg' in data) {
          const { msg, ...restData } = data; // 解构data，将msg分离出来
          return {
            code: statusCode,
            msg, // 将msg放在外层
            data: restData, // 剩余的data属性
          };
        } else {
          // 如果data中没有msg，直接返回原data
          return {
            code: statusCode,
            data,
          };
        }
      }),
    );
  }
}
