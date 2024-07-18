import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsString()
  @IsOptional()
  name?: string;

  // 修改人，假设是一个用户ID，可以是可选的
  @IsNumber()
  @IsOptional()
  updatedBy?: number;
}
