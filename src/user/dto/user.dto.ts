import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UserDto {
  @ApiProperty({
    description: 'username',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'email',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'password',
  })
  @IsString()
  @Length(6, 20)
  password: string;
}
