import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { UrlCheckLogService } from './url-check-log.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { filter } from 'rxjs';
import { ReportFiltersDto } from './dto/report-filters.dto';

@ApiTags('UrlCheckLog')
@Controller('url-check-log')
export class UrlCheckLogController {
  constructor(private readonly urlCheckService: UrlCheckLogService) {}

  @UseGuards(JwtAuthGuard)
  @Get('report')
  findAll(@Query() q: ReportFiltersDto, @Request() req) {
    const filters = {
      userId: req.user.userId,
      from: new Date(q.from),
      to: new Date(q.to),
      tags: q?.tags?.split(',') || [],
    };
    return this.urlCheckService.report(filters);
  }
}
