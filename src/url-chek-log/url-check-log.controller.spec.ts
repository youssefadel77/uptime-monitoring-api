import { Test, TestingModule } from '@nestjs/testing';
import { UrlCheckLogController } from './url-check-log.controller';
import { UrlCheckLogService } from './url-check-log.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ReportFiltersDto } from './dto/report-filters.dto';

describe('UrlCheckLogController', () => {
  let controller: UrlCheckLogController;
  let service: UrlCheckLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlCheckLogController],
      providers: [
        {
          provide: UrlCheckLogService,
          useValue: {
            report: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard) // Override the guard for testing purposes
      .useValue({ canActivate: () => true }) // Mock the guard's canActivate method
      .compile();

    controller = module.get<UrlCheckLogController>(UrlCheckLogController);
    service = module.get<UrlCheckLogService>(UrlCheckLogService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return the report from UrlCheckLogService', async () => {
      const reportResult = []; // Fill in the expected report result

      const mock = jest.spyOn(service, 'report');
      mock.mockImplementation(() => Promise.resolve(reportResult));

      const request: Request = { user: { userId: 1 } } as unknown as Request;

      const reportFiltersDto: ReportFiltersDto = {
        from: '2023-01-01',
        to: '2023-12-31',
      };

      const result = await controller.findAll(reportFiltersDto, request);

      expect(result).toBe(reportResult);
    });
  });
});
