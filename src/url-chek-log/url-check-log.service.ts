import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUrlCheckLogDto } from './dto/create-url-check-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UrlCheckLogEntity } from './entities/url-check-log.entity';
import { UrlCheck } from '../url-chek/entities/url-chek.entity';
import { In } from 'typeorm';

@Injectable()
export class UrlCheckLogService {
  constructor(
    @InjectRepository(UrlCheckLogEntity)
    private readonly urlCheckLogRepository: Repository<UrlCheckLogEntity>,
    @InjectRepository(UrlCheck)
    private readonly urlCheckRepository: Repository<UrlCheck>,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(data: CreateUrlCheckLogDto) {
    const urlCheckLog = await this.urlCheckLogRepository.save(data);
    console.log('here');
    this.eventEmitter.emit('urlCheckLog.created', urlCheckLog);
    return urlCheckLog;
  }

  async report({ userId, from, to, tags }) {
    const urlChecks = await this.urlCheckRepository
      .createQueryBuilder('url_check')
      .where('url_check.userId = :userId', { userId })
      .andWhere('url_check.tags::text[] @> :tags', { tags: tags })
      .getMany();
    if (!urlChecks || urlChecks.length === 0) {
      throw new NotFoundException('No URL checks found for the given user.');
    }
    const report = [];
    for (const urlCheck of urlChecks) {
      const logs = await this.urlCheckLogRepository.find({
        where: {
          urlCheckId: urlCheck.id,
          createdAt: Between(from, to),
        },
      });

      const totalLogs = logs.length;
      const successfulLogs = logs.filter((log) => log.status === 200).length;
      const downtimeLogs = logs.filter((log) => log.status !== 200).length;
      const totalResponseTime = logs.reduce(
        (sum, log) => sum + log.responseTime,
        0,
      );

      const availability = (successfulLogs / totalLogs) * 100;
      const downtime = downtimeLogs * urlCheck.interval;
      const uptime = (totalLogs - downtimeLogs) * urlCheck.interval;
      const averageResponseTime = totalResponseTime / totalLogs;

      report.push({
        urlCheckId: urlCheck.id,
        status: urlCheck.status,
        totalLogs: totalLogs,
        availability: availability.toFixed(2),
        outages: downtimeLogs,
        downtime: downtime,
        uptime: uptime,
        averageResponseTime: averageResponseTime.toFixed(2),
        history: logs.map((log) => ({
          status: log.status,
          responseTime: log.responseTime,
          timestamp: log.createdAt,
        })),
      });
    }

    return report;
  }
}
