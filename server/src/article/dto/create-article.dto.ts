import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateArticleDto {
  //文章标题
  @IsString()
  @IsOptional()
  title?: string;

  //文章内容
  @IsString()
  @IsOptional()
  content?: string;

  // 文章分类ID
  @IsNumber()
  @IsOptional()
  categoryId?: number;
}
