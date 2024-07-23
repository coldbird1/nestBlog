import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Request } from 'express';
@Controller('article')
@Public()
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('add')
  create(@Body() createArticleDto: CreateArticleDto, @Req() request: Request) {
    const mergeDto = {
      ...createArticleDto,
      updatedBy: request.user?.username,
      createdBy: request.user?.username,
      author: request.user?.userid,
    };
    return this.articleService.create(mergeDto);
  }

  @Get('list')
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.articleService.findAll(paginationQueryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
