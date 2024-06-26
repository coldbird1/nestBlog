import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({ description: 'The name of the coffee' })
  @IsString()
  readonly username: string;

  @IsString()
  password: string;
}
