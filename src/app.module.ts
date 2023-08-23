import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlCheckModule } from './url-chek/url-check.module';
import { UrlCheck } from './url-chek/entities/url-chek.entity';
import { User } from './users/entities/user.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UrlCheckLogEntity } from './url-chek-log/entities/url-check-log.entity';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      password: 'mypassword',
      username: 'myuser',
      entities: [User, UrlCheck, UrlCheckLogEntity],
      database: 'mydatabase',
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([UrlCheck]), // Include the UrlCheck entity here
    TypeOrmModule.forFeature([User]), // Include the UrlCheck entity here
    EventEmitterModule.forRoot(),
    AuthModule,
    UsersModule,
    UrlCheckModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
