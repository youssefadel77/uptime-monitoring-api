import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UrlCheckService } from './url-check.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UrlCheck } from './entities/url-chek.entity';

describe('UrlCheckService', () => {
  let service: UrlCheckService;
  let urlCheckRepository: Repository<UrlCheck>;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlCheckService,
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

    service = module.get<UrlCheckService>(UrlCheckService);
    urlCheckRepository = module.get<Repository<UrlCheck>>(
      getRepositoryToken(UrlCheck),
    );
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  describe('findAll', () => {
    it('should return all url checks', async () => {
      const urlChecks = [
        {
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
        },
        {
          id: 2,
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
        },
      ];

      jest.spyOn(urlCheckRepository, 'find').mockResolvedValue(urlChecks);

      const result = await service.findAll(1);

      expect(urlCheckRepository.find).toHaveBeenCalled();
      expect(result).toEqual(urlChecks);
    });
  });

  describe('findOne', () => {
    it('should return a url check by id', async () => {
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

      jest.spyOn(urlCheckRepository, 'findOne').mockResolvedValue(urlCheck);

      const result = await service.findOne(1);

      expect(urlCheckRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(urlCheck);
    });
  });

  describe('create', () => {
    it('should create a new url check', async () => {
      const createdUrlCheck = {
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
      const createDto = { id: 1, ...createdUrlCheck };

      jest.spyOn(urlCheckRepository, 'save').mockResolvedValue(createdUrlCheck);

      const result = await service.create(createDto, 1);

      expect(urlCheckRepository.save).toHaveBeenCalledWith(createDto);
      expect(eventEmitter.emit).toHaveBeenCalledWith(
        'urlCheck.created',
        createdUrlCheck,
      );
      expect(result).toEqual(createdUrlCheck);
    });
  });

  describe('update', () => {
    it('should update an existing url check', async () => {
      const updatedUrlCheck = {
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
      const updateDto = { id: 1, ...updatedUrlCheck };

      jest.spyOn(urlCheckRepository, 'update').mockResolvedValue(undefined);
      jest
        .spyOn(urlCheckRepository, 'findOne')
        .mockResolvedValue(updatedUrlCheck);

      const result = await service.update(1, updateDto);

      expect(urlCheckRepository.update).toHaveBeenCalledWith(1, updateDto);
      expect(urlCheckRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(eventEmitter.emit).toHaveBeenCalledWith(
        'urlCheck.updated',
        updatedUrlCheck,
      );
      expect(result).toEqual(updatedUrlCheck);
    });
  });

  describe('remove', () => {
    it('should remove an existing url check', async () => {
      jest.spyOn(urlCheckRepository, 'delete').mockResolvedValue(undefined);

      await service.remove(1);

      expect(urlCheckRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
