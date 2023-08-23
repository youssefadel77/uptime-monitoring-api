import { IsString, IsNotEmpty, IsUrl, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Super Admin' })
  userName: string;

  @IsUrl()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'admin@bosta.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123456' })
  password: string;
}
