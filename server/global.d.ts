import { Request } from 'express';

declare global {
  // 声明一个全局命名空间，Express 已经定义好了这个命名空间
  namespace Express {
    // 扩展 Request 接口，添加自定义的 user 属性
    interface Request {
      user?: { username: string; userid: number }; // 注意这里使用了 ? 表示 user 可能是 undefined
    }
  }
}
