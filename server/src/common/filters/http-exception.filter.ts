import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus(); // 获取状态码
    const exceptionResponse = exception.getResponse();

    // 保留自定义的 'code'，但确保不直接传递原始的 exceptionResponse 中可能包含的 statusCode
    const errorResponse = {
      code: status, // 使用获取到的状态码作为 'code'
      ...(typeof exceptionResponse === 'object' && exceptionResponse !== null // 确保 exceptionResponse 是对象且不为null
        ? Object.keys(exceptionResponse).reduce((acc, key) => {
            if (key !== 'statusCode') {
              // 过滤掉 'statusCode' 键
              acc[key] = exceptionResponse[key];
            }
            return acc;
          }, {})
        : { message: exceptionResponse }),
      timestamp: new Date().toISOString(),
    };

    // 返回修改后的错误响应，其中不包含原始的 'statusCode'
    response.status(status).json(errorResponse);
  }
}
