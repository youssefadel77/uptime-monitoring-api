import { Test, TestingModule } from '@nestjs/testing';
import { UrlCheckLogService } from './url-check-log.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlCheckLogEntity } from './entities/url-check-log.entity';
import { UrlCheck } from '../url-chek/entities/url-chek.entity';

describe('UrlCheckLogService', () => {
  let service: UrlCheckLogService;
  let urlCheckLogRepository: Repository<UrlCheckLogEntity>;
  let urlCheckRepository: Repository<UrlCheck>;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlCheckLogService,
        {
          provide: getRepositoryToken(UrlCheckLogEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(UrlCheck),
          useClass: Repository,
        },
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UrlCheckLogService>(UrlCheckLogService);
    urlCheckLogRepository = module.get<Repository<UrlCheckLogEntity>>(
      getRepositoryToken(UrlCheckLogEntity),
    );
    urlCheckRepository = module.get<Repository<UrlCheck>>(
      getRepositoryToken(UrlCheck),
    );
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('report', () => {
    it('should return a list of url check logs', async () => {
      const expectedLogs = [
        /* create an array of expected logs */
      ];

      const mock = jest.spyOn(service, 'report');
      mock.mockImplementation(() => Promise.resolve(expectedLogs));

      const from = Date.now();
      const to = Date.now();

      const logs = await service.report({ userId: 1, from, to });

      expect(logs).toEqual(expectedLogs);
    });
  });

  describe('create', () => {
    it('should create a new url check log', async () => {
      const createUrlCheckLogDto = {
        data: '',
        responseTime: 1000,
        status: 200,
        urlCheckId: 1,
      };

      const urlCheck = {
        id: 1,
        name: 'Example Check',
        url: 'webhook.site',
        protocol: 'https',
        path: '/2d4e69e4-f69f-449f-a4bc-0e75a722119a',
        port: null,
        webhook: null,
        timeout: 1,
        interval: 300,
        threshold: 2,
        authentication_username: null,
        authentication_password: null,
        http_headers: null,
        assert: null,
        tags: [],
        ignore_ssl: false,
        created_at: new Date(),
        updated_at: new Date(),
        logs: [],
        userId: 1,
      };

      const createdLog = {
        id: 1,
        data: '',
        responseTime: 1000,
        status: 200,
        urlCheckId: 1,
        createdAt: new Date(),
      };

      const mock = jest.spyOn(urlCheckRepository, 'findOneBy');
      mock.mockImplementation(() => Promise.resolve(urlCheck));

      const mockLog = jest.spyOn(urlCheckLogRepository, 'save');
      mockLog.mockImplementation(() => Promise.resolve(createdLog));

      const result = await service.create(createUrlCheckLogDto);

      expect(result).toBe(createdLog);
      expect(eventEmitter.emit).toHaveBeenCalledWith(
        'urlCheckLog.created',
        createdLog,
      );
    });
  });
});
