import { Test, TestingModule } from '@nestjs/testing';
import { randomBytes, randomUUID } from 'crypto';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { AnimalService } from '../animal/animal.service';
import { PrismaService } from '../prisma/prisma.service';
import { SpottingService } from './spotting.service';
import { UserService } from '../user/user.service';

const moduleMocker = new ModuleMocker(global);

const spottingId = randomUUID();
const userIdentifier = randomBytes(16).toString('hex');
const animalId = randomUUID();

const spottingArray = [
  { id: spottingId, userIdentifier, animalId },
  { id: randomUUID(), userIdentifier, animalId },
  { id: randomUUID(), userIdentifier, animalId }
];
const oneSpotting = spottingArray[0];

const db = {
  spotting: {
    create: jest.fn().mockResolvedValue(oneSpotting),
    findUnique: jest.fn().mockResolvedValue(oneSpotting),
    findMany: jest.fn().mockResolvedValue(spottingArray)
  }
};

describe('SpottingService', () => {
  let service: SpottingService;
  let animalService: AnimalService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpottingService]
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

    service = module.get<SpottingService>(SpottingService);
    animalService = module.get<AnimalService>(AnimalService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a spotting', () => {
      jest.spyOn(animalService, 'findOne').mockResolvedValueOnce({
        id: animalId,
        name: '',
        disabled: false,
        lightColor: '',
        darkColor: '',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      jest.spyOn(userService, 'findOrCreate').mockResolvedValueOnce({
        id: randomUUID(),
        identifier: userIdentifier,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      expect(
        service.create({ userIdentifier, animalId, latitude: 0, longitude: 0, traffic: 1, visibility: 1 })
      ).resolves.toEqual(oneSpotting);
    });

    it('should throw an error if the animal does not exist', () => {
      jest.spyOn(animalService, 'findOne').mockResolvedValueOnce(null);
      expect(
        service.create({ userIdentifier, animalId, latitude: 0, longitude: 0, traffic: 1, visibility: 1 })
      ).rejects.toThrowError('Animal does not exist');
    });
  });

  describe('getSpotting', () => {
    it('should get a spotting', () => {
      expect(service.getSpotting(spottingId)).resolves.toEqual(oneSpotting);
    });
  });

  describe('getSpottings', () => {
    it('should get an array of spottings', () => {
      expect(service.getSpottings({ date: '', animals: [], excludeAnimals: [] })).resolves.toEqual(spottingArray);
    });
  });
});
