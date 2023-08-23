import { EventSubscriber } from 'typeorm';
import { OnEvent } from '@nestjs/event-emitter';
import { UrlCheckClientService } from '../url-check-client.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@EventSubscriber()
export class UrlCheckUpdatedSubscriber {
  constructor(
    private readonly urlCheckClientService: UrlCheckClientService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  @OnEvent('urlCheck.updated', { async: true })
  async handleUrlCheckUpdated(payload: any) {
    const job = new CronJob(`0 */${payload.interval} * * * *`, () =>
      this.urlCheckClientService.check(payload),
    );

    await this.deleteCron(payload.id);

    this.schedulerRegistry.addCronJob(payload.id, job);
    job.start();
  }

  async deleteCron(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
    console.log(`Cron ${name} deleted`);
  }
}
