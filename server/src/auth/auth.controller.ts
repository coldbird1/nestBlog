import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public } from '../common/decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 注册
  @Post('/signup')
  signup(@Body() signupData: CreateAuthDto) {
    return this.authService.signup(signupData);
  }

  // 登录
  @Post('/login')
  login(@Body() loginData: CreateAuthDto) {
    return this.authService.login(loginData);
  }
}
