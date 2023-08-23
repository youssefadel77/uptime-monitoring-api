import { EventSubscriber } from 'typeorm';
import { OnEvent } from '@nestjs/event-emitter';
import { UrlCheckService } from '../../url-chek/url-check.service';
import { MailService } from '../../mail/mail.service';

@EventSubscriber()
export class UrlCheckCreatedSubscriber {
  constructor(
    private readonly urlCheckService: UrlCheckService,
    private readonly mailService: MailService,
  ) {}

  @OnEvent('urlCheckLog.created', { async: true })
  async handleUrlCheckLogCreated(payload: any) {
    const urlCheck = await this.urlCheckService.findOne(payload.urlCheckId);
    if (urlCheck.status !== payload.status) {
      await this.mailService.sendEmail(
        urlCheck.userId,
        'Url Check Status Changed',
        `The status of your URL check for ${urlCheck.url} has changed to ${
          payload.status === 200 ? 'UP' : 'DOWN'
        }.`,
      );
    }
    await this.urlCheckService.update(payload.urlCheckId, {
      status: payload.status,
    });
  }
}
