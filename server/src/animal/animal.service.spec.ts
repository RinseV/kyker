import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { PrismaService } from '../prisma/prisma.service';
import { AnimalService } from './animal.service';

const moduleMocker = new ModuleMocker(global);

const animalId = randomUUID();
const animalName = 'Animal';

const animalArray = [
  { id: animalId, name: animalName, disabled: false },
  { id: randomUUID(), name: 'Animal 2', disabled: false },
  { id: randomUUID(), name: 'Animal 3', disabled: false }
];
const oneAnimal = animalArray[0];

const db = {
  animal: {
    findMany: jest.fn().mockResolvedValue(animalArray),
    findFirst: jest.fn().mockResolvedValue(oneAnimal)
  }
};

describe('AnimalService', () => {
  let service: AnimalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimalService]
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

    service = module.get<AnimalService>(AnimalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should get an array of animals', () => {
      expect(service.findAll()).resolves.toEqual(animalArray);
    });
  });

  describe('findOne', () => {
    it('should get a single animal', () => {
      expect(service.findOne({ id: animalId })).resolves.toEqual(oneAnimal);
    });
  });
});
