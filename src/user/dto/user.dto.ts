import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, Length } from 'class-validator';
import { USER_ROLE } from 'src/common/type';

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
    enum: USER_ROLE,
    description: 'Role User',
  })
  @IsEnum(USER_ROLE)
  role: USER_ROLE;

  @ApiProperty({
    description: 'password',
  })
  @IsString()
  @Length(6, 20)
  password: string;
}
