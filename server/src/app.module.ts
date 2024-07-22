import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CoffeesModule } from './coffees/coffees.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';

import * as Joi from '@hapi/joi';

import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './config/jwt.config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    //Async将在最后加载
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql', // 数据库类型
        host: 'localhost', // 主机名
        port: 3306, // 端口
        username: 'root', // 用户名
        password: 'root', // 密码
        database: 'nestblog', // 数据库名称
        synchronize: true,
        retryDelay: 500, //重试连接数据库间隔
        retryAttempts: 10, //重试连接数据库的次数
        autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
      }),
      // useFactory: () => ({
      //   type: 'postgres',
      //   host: process.env.DATABASE_HOST,
      //   port: +process.env.DATABASE_PORT,
      //   username: process.env.DATABASE_USERNAME,
      //   password: process.env.DATABASE_PASSWORD,
      //   database: process.env.DATABASE_NAME,
      //   autoLoadEntities: true,
      //   synchronize: true,
      // }),
    }),
    // ConfigModule.forRoot({
    //   validationSchema: Joi.object({
    //     DATABASE_HOST: Joi.required(),
    //     DATABASE_PORT: Joi.number().default(5432),
    //   }),
    // }),
    CoffeesModule,
    CommonModule,
    AuthModule,
    CategoryModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [
    //全局路由守卫
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
