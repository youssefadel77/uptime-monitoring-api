import { forwardRef, Module } from '@nestjs/common';
import { UrlCheckService } from './url-check.service';
import { UrlCheckController } from './url-check.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlCheck } from './entities/url-chek.entity';
import { UrlCheckCreatedSubscriber } from './subscriber/url-check-created.subscriber';
import { UrlCheckUpdatedSubscriber } from './subscriber/url-check-updated.subscriber';
import { UrlCheckClientService } from './url-check-client.service';
import { HttpModule } from '@nestjs/axios';
import { UrlCheckLogModule } from '../url-chek-log/url-check-log.module';
import { UsersModule } from '../users/users.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([UrlCheck]),
    HttpModule,
    forwardRef(() => UrlCheckLogModule),
    forwardRef(() => UsersModule),
    ScheduleModule.forRoot(),
  ],
  controllers: [UrlCheckController],
  providers: [
    UrlCheckService,
    UrlCheckCreatedSubscriber,
    UrlCheckUpdatedSubscriber,
    UrlCheckClientService,
    UrlCheck,
  ],
  exports: [TypeOrmModule.forFeature([UrlCheck]), UrlCheckService],
})
export class UrlCheckModule {}
