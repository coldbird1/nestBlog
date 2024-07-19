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
import { ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryService } from './category.service';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Request } from 'express';
@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('list')
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.categoryService.findAll(paginationQueryDto);
  }

  @Post('add')
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Req() request: Request,
  ) {
    const mergeDto = {
      ...createCategoryDto,
      updatedBy: request.user?.username ?? 'null',
      createdBy: request.user?.username ?? 'null',
    };
    return this.categoryService.create(mergeDto);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: number,
    @Body() updateCoffeeDto: UpdateCategoryDto,
    @Req() request: Request,
  ) {
    const mergeDto = {
      ...updateCoffeeDto,
      updatedBy: request.user?.username ?? 'null',
    };
    return this.categoryService.update(id, mergeDto);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: number) {
    return this.categoryService.remove(id);
  }
}
