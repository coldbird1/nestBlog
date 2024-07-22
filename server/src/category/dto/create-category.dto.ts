import { IsString, IsOptional, IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsString()
  @IsOptional()
  name?: string;

  // 修改人
  @IsString()
  @IsOptional()
  updatedBy?: string;

  // 创建人
  @IsString()
  @IsOptional()
  createdBy?: string;
}
