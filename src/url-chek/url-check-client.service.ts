import { Injectable } from '@nestjs/common';
import { UrlCheck } from './entities/url-chek.entity';
import { AxiosRequestConfig } from 'axios';
import https from 'https';
import { HttpService } from '@nestjs/axios';
import { UrlCheckLogService } from '../url-chek-log/url-check-log.service';

@Injectable()
export class UrlCheckClientService {
  constructor(
    private readonly httpService: HttpService,
    private readonly checkLogService: UrlCheckLogService,
  ) {}

  createAxiosRequest(model: UrlCheck): AxiosRequestConfig {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `${model.protocol.toLowerCase()}://${model.url}${
        model.port ? `:${model.port}` : ''
      }${model.path}`,
      timeout: model.timeout * 1000,
      headers: {},
      validateStatus: () => true, // Disable Axios default status code validation
    };

    if (model.authentication_username && model.authentication_password) {
      config.auth = {
        username: model.authentication_username,
        password: model.authentication_password,
      };
    }

    if (model.http_headers) {
      config.headers = {
        ...config.headers,
        ...model.http_headers,
      };
    }

    if (model.ignore_ssl && model.protocol.toLowerCase() === 'https') {
      config.httpsAgent = new https.Agent({
        rejectUnauthorized: false,
      });
    }

    return config;
  }

  async check(model: UrlCheck) {
    try {
      const requestConfig = this.createAxiosRequest(model);
      const startTime = Date.now();
      const response = await this.httpService
        .request(requestConfig)
        .toPromise();
      const endTime = Date.now();
      return this.checkLogService.create({
        urlCheckId: model.id,
        status: response.status,
        data: response.data,
        responseTime: endTime - startTime,
      });
    } catch (e) {
      return this.checkLogService.create({
        urlCheckId: model.id,
        status: 500,
        data: e.message,
        responseTime: 0,
      });
    }
  }
}
