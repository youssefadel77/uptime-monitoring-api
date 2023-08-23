import { Test, TestingModule } from '@nestjs/testing';
import { UrlCheckController } from './url-check.controller';
import { UrlCheckService } from './url-check.service';
import { CreateUrlCheckDto } from './dto/create-url-check.dto';
import { UpdateUrlCheckDto } from './dto/update-url-check.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

describe('UrlCheckController', () => {
  let controller: UrlCheckController;
  let service: UrlCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlCheckController],
      providers: [
        {
          provide: UrlCheckService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard) // Override the guard for testing purposes
      .useValue({ canActivate: () => true }) // Mock the guard's canActivate method
      .compile();

    controller = module.get<UrlCheckController>(UrlCheckController);
    service = module.get<UrlCheckService>(UrlCheckService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new url check', async () => {
      const createUrlCheckDto: CreateUrlCheckDto = {
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
      };
      const expectedResult = {
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
        userId: 1,
      }; // Fill in the expected result

      const mock = jest.spyOn(service, 'create');
      mock.mockImplementation(() => Promise.resolve(expectedResult));

      const req: Request = { user: { userId: 1 } } as unknown as Request; // Mock the Request object

      const result = await controller.create(req, createUrlCheckDto);

      expect(result).toBe(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return an array of url checks', async () => {
      const expectedResult = [
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
      ]; // Fill in the expected result

      const mock = jest.spyOn(service, 'findAll');
      mock.mockImplementation(() => Promise.resolve(expectedResult));

      const req: Request = { user: { userId: 1 } } as unknown as Request; // Mock the Request object

      const result = await controller.findAll(req);

      expect(result).toBe(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a single url check', async () => {
      const id = '1'; // Fill in the ID of the url check
      const expectedResult = {
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
      }; // Fill in the expected result

      const mock = jest.spyOn(service, 'findOne');
      mock.mockImplementation(() => Promise.resolve(expectedResult));

      const result = await controller.findOne(id);

      expect(result).toBe(expectedResult);
    });
  });

  describe('update', () => {
    it('should update an existing url check', async () => {
      const id = '1'; // Fill in the ID of the url check
      const updateUrlCheckDto: UpdateUrlCheckDto = {
        name: 'Example Check3',
      };
      const expectedResult = {
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
      }; // Fill in the expected result

      const mock = jest.spyOn(service, 'update');
      mock.mockImplementation(() => Promise.resolve(expectedResult));

      const result = await controller.update(id, updateUrlCheckDto);

      expect(result).toBe(expectedResult);
    });
  });

  describe('remove', () => {
    it('should remove an existing url check', async () => {
      const id = '1';
      const expectedResult = 'Url check deleted';

      const mock = jest.spyOn(service, 'remove');
      mock.mockImplementation(() => Promise.resolve(expectedResult));

      const result = await controller.remove(id);

      expect(result).toBe(expectedResult);
    });
  });
});
