import { IsOptional } from 'class-validator';

export class ReportFiltersDto {
  @IsOptional()
  from?: string;

  @IsOptional()
  to?: string;

  @IsOptional()
  tags?: string;
}
