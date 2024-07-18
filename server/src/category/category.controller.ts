import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryService } from './category.service';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('category')
@Controller('category')
@Public()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('list')
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.categoryService.findAll(paginationQueryDto);
  }

  @Post('add')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Patch('update/:id')
  update(@Param('id') id: number, @Body() updateCoffeeDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCoffeeDto);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: number) {
    return this.categoryService.remove(id);
  }
}
