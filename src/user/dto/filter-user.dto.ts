import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';
import { QueryParams } from 'src/common/dto';

export class UserFilterDto extends QueryParams {
  @ApiPropertyOptional({
    description: 'Username',
  })
  @IsOptional()
  @IsString()
  username: string;

  @ApiPropertyOptional({
    description: 'Email',
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    description: 'request created at start',
  })
  @IsOptional()
  @IsDateString()
  createdAt: Date;
}
