import {
  IsString,
  IsOptional,
  IsNumber,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { User } from 'src/auth/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';

export class CreateArticleDto {
  @ApiProperty({ description: '文章标题', example: 'My First Article' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: '文章内容',
    example: 'This is the content of my first article.',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ type: () => Category, description: '文章分类' })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}
