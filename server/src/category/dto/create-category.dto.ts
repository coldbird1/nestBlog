import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsString()
  @IsOptional()
  name?: string;

  // 修改人，假设是一个用户ID，可以是可选的
  @IsNumber()
  @IsOptional()
  updatedBy?: number;
}
