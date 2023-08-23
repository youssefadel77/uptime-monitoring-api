import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { MailService } from './mail.service';

@Module({
  imports: [forwardRef(() => UsersModule)],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
