import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NV_Users } from './entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../config/jwt.config';
import JwtAuthStrategy from '../common/guards/jwt-auth.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([NV_Users]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthStrategy],
})
export class AuthModule {}
