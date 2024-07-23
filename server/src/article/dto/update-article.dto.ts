import { CreateArticleDto } from './create-article.dto';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/category/entities/category.entity';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  @ApiProperty({ type: () => Category, description: '作者id' })
  @IsNumber()
  @IsOptional()
  userId?: number;
}
