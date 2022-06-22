import { Test, TestingModule } from '@nestjs/testing';
import { CampSize } from '@prisma/client';
import { randomUUID } from 'crypto';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { PrismaService } from '../prisma/prisma.service';
import { CampService } from './camp.service';

const moduleMocker = new ModuleMocker(global);

const campId = randomUUID();
const campName = 'Camp';

const campArray = [
  { id: campId, name: campName, size: CampSize.REST },
  { id: randomUUID(), name: 'Camp 2', size: CampSize.REST },
  { id: randomUUID(), name: 'Camp 3', size: CampSize.REST }
];

const db = {
  camp: {
    findMany: jest.fn().mockResolvedValue(campArray)
  }
};

describe('CampService', () => {
  let service: CampService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampService]
    })
      .useMocker((token) => {
        if (token === PrismaService) {
          return db;
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    service = module.get<CampService>(CampService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should get an array of camps', () => {
      expect(service.findAll()).resolves.toEqual(campArray);
    });
  });
});
