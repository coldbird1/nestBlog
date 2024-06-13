import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CoffeesModule } from './coffees/coffees.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import * as Joi from '@hapi/joi';
@Module({
  imports: [
    //Async将在最后加载
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
      }),
    }),
    CoffeesModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
