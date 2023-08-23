import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsOptional,
  IsInt,
  IsArray,
  IsBoolean,
  IsObject,
  IsNumber,
} from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUrlCheckDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Example Check' })
  name: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ example: 'webhook.site' })
  url: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'https' })
  protocol: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '/2d4e69e4-f69f-449f-a4bc-0e75a722119a' })
  path?: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({ example: '3000' })
  port?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '' })
  webhook?: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({ example: 10 })
  timeout?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ example: 10 })
  interval?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ example: 10 })
  threshold?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'auth' })
  authentication_username?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'auth' })
  authentication_password?: string;

  @IsObject()
  @IsOptional()
  @ApiProperty({ example: { 'Content-Type': 'application/json' } })
  http_headers?: Record<string, string>;

  @IsObject()
  @IsOptional()
  @ApiProperty({ example: { status: 200 } })
  assert?: Record<string, any>;

  @IsArray()
  @IsOptional()
  @ApiProperty({ example: ['tag1', 'tag2'] })
  tags?: string[];

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: true })
  ignore_ssl?: boolean;

  @IsNumber()
  @IsOptional()
  userId?: number;

  @IsNumber()
  @IsOptional()
  status?: number;
}
