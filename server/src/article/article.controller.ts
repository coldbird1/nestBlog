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
import { CategoryService } from 'src/category/category.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Request } from 'express';
import { UserService } from 'src/auth/user.service';
@Controller('article')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly categoryService: CategoryService,
    private readonly userService: UserService,
  ) {}

  @Post('add')
  async create(
    @Body() createArticleDto: CreateArticleDto,
    @Req() request: Request,
  ) {
    const category = await this.categoryService.findOne(
      createArticleDto.categoryId,
    );
    const user = await this.userService.findOne(request.user?.userid);
    const article = {
      ...createArticleDto,
      updatedBy: request.user?.username,
      createdBy: request.user?.username,
      category,
      user,
    };
    return this.articleService.create(article);
  }

  @Get('list')
  @Public()
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.articleService.findAll(paginationQueryDto);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    // const { categoryId, userId, ...restOfProperties } = updateArticleDto; // 解构并排除categoryId
    const category = await this.categoryService.findOne(
      updateArticleDto.categoryId,
    );
    const article = {
      ...updateArticleDto,
      category,
    };
    return this.articleService.update(id, article);
  }

  @Delete('delete')
  batchDelete(@Body('ids') ids: number[]) {
    return this.articleService.remove(ids);
  }
}
