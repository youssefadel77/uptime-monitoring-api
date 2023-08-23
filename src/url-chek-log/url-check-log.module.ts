import { forwardRef, Module } from '@nestjs/common';
import { UrlCheckLogService } from './url-check-log.service';
import { UrlCheckLogController } from './url-check-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlCheckLogEntity } from './entities/url-check-log.entity';
import { UrlCheckModule } from '../url-chek/url-check.module';
import { UrlCheckCreatedSubscriber } from './subscriber/url-check-created.subscriber';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UrlCheckLogEntity]),
    forwardRef(() => UrlCheckModule),
    forwardRef(() => MailModule),
  ],
  controllers: [UrlCheckLogController],
  providers: [UrlCheckLogService, UrlCheckCreatedSubscriber],
  exports: [UrlCheckLogService],
})
export class UrlCheckLogModule {}
