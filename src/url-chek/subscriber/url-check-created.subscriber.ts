import { EventSubscriber } from 'typeorm';
import { OnEvent } from '@nestjs/event-emitter';
import { UrlCheckClientService } from '../url-check-client.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@EventSubscriber()
export class UrlCheckCreatedSubscriber {
  constructor(
    private readonly urlCheckClientService: UrlCheckClientService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  @OnEvent('urlCheck.created', { async: true })
  async handleUrlCheckCreated(payload: any) {
    await this.urlCheckClientService.check(payload);

    const job = new CronJob(`0 */${payload.interval} * * * *`, () =>
      this.urlCheckClientService.check(payload),
    );

    this.schedulerRegistry.addCronJob(payload.id, job);
    job.start();
  }
}
