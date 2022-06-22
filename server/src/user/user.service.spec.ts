import { Test, TestingModule } from '@nestjs/testing';
import { randomBytes, randomUUID } from 'crypto';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';

const moduleMocker = new ModuleMocker(global);

const userId = randomUUID();
const userIdentifier = randomBytes(16).toString('hex');
const user = {
  id: userId,
  identifier: userIdentifier
};

const db = {
  user: {
    findUnique: jest.fn().mockResolvedValue(user),
    create: jest.fn().mockResolvedValue(user)
  }
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService]
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

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOrCreate', () => {
    it('should get the existing user', () => {
      expect(service.findOrCreate({ identifier: userIdentifier })).resolves.toEqual(user);
    });

    it('should create a user if it does not exist', () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(null);
      expect(service.findOrCreate({ identifier: userIdentifier })).resolves.toEqual(user);
    });
  });
});
