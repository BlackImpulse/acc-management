import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { AccountRepository } from './account.repository';
import { PersonService } from '../person/person.service';
import { NotFoundException } from '@nestjs/common';
import { CreateAccountRequestDto } from './dto/create-account-request.dto';

describe('Account service', () => {
  let service: AccountService;

  const mockPerson = {
    id: 1,
    name: 'Sergei',
    document: 'document',
    birthDate: new Date(),
  };

  const mockAccountRepository = {
    save: jest.fn().mockImplementation(),
  };

  const mockPersonService = {
    findOne: jest.fn().mockImplementation((id) => {
      if (id !== 1) {
        throw new NotFoundException();
      }
      return Promise.resolve(mockPerson);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        { provide: AccountRepository, useValue: mockAccountRepository },
        { provide: PersonService, useValue: mockPersonService },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('crate method should call save', async () => {
    const createAccountDto: CreateAccountRequestDto = {
      personId: 1,
      accountType: 1,
    };
    await service.create(createAccountDto);

    expect(mockAccountRepository.save).toBeDefined();
  });

  it('crate method should throw exception', () => {
    const createAccountDto: CreateAccountRequestDto = {
      personId: 0,
      accountType: 1,
    };

    expect(() => service.create(createAccountDto)).rejects.toThrow(
      NotFoundException,
    );
  });
});
