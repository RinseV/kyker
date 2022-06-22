import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { PrismaService } from '../prisma/prisma.service';
import { GateService } from './gate.service';

const moduleMocker = new ModuleMocker(global);

const gateId = randomUUID();
const gateName = 'Gate';

const gateArray = [
  { id: gateId, name: gateName },
  { id: randomUUID(), name: 'Gate 2' },
  { id: randomUUID(), name: 'Gate 3' }
];

const db = {
  gate: {
    findMany: jest.fn().mockResolvedValue(gateArray)
  }
};

describe('GateService', () => {
  let service: GateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GateService]
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

    service = module.get<GateService>(GateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should get an array of gates', () => {
      expect(service.findAll()).resolves.toEqual(gateArray);
    });
  });
});
