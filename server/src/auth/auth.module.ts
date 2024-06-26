import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NV_Users } from './entities/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NV_Users])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
