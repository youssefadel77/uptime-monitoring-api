import { IsNotEmpty, IsUrl, IsNumber } from 'class-validator';

export class CreateUrlCheckLogDto {
  @IsNumber()
  @IsNotEmpty()
  status: number;

  @IsNumber()
  @IsNotEmpty()
  urlCheckId: any;

  @IsUrl()
  @IsNotEmpty()
  data: string;

  @IsNumber()
  @IsNotEmpty()
  responseTime: number;
}
