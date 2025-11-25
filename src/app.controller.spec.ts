import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const mockPrismaService = {
      $queryRaw: jest.fn().mockResolvedValue([{ '?column?': 1 }]),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getHealth', () => {
    it('should return health check response with status UP', async () => {
      const result = await appController.getHealth();
      
      expect(result).toHaveProperty('status');
      expect(result).toHaveProperty('components');
      expect(result.components).toHaveProperty('database');
      expect(result.components).toHaveProperty('downstreamServiceA');
      expect(result.components).toHaveProperty('messageQueue');
      expect(result.status).toBe('UP');
    });
  });
});
