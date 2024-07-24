import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Patch,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public } from '../common/decorators/public.decorator';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../common/dto/api.response';
import { UserService } from './user.service';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Public()
@Controller('user')
@ApiTags('AppController')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  @Public()
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.userService.findAll(paginationQueryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }
}
