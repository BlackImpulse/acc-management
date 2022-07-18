import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { AccountRepository } from './account.repository';
import { PersonService } from '../person/person.service';
import { NotFoundException } from '@nestjs/common';
import { CreateAccountRequestDto } from './dto/create-account-request.dto';

describe('Account service', () => {
  let service: AccountService;

  const mockAccount = {
    id: 1,
    balance: 1000,
    dailyWithdrawalLimit: 500,
    activeFlag: true,
    accountType: 1,
    createDate: new Date(),
    client: undefined,
    transactions: [{ id: 1, value: 100, transactionDate: new Date() }],
  };

  const mockPerson = {
    id: 1,
    name: 'Sergei',
    document: 'document',
    birthDate: new Date(),
  };

  const mockAccountRepository = {
    save: jest.fn().mockImplementation(),
    findOne: jest.fn().mockImplementation((id) => {
      if (id !== 1) {
        throw new NotFoundException();
      }
      return Promise.resolve(mockAccount);
    }),
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

  it('getBalance method should call findOne', () => {
    const validId = 1;
    service.getBalance(validId);

    expect(mockAccountRepository.findOne).toHaveBeenCalled();
  });

  it('getBalance method should return balance', () => {
    const validId = 1;
    const findOneSpy = jest
      .spyOn(service, 'findOne')
      .mockReturnValue(Promise.resolve(mockAccount));

    const balance = service.getBalance(validId);

    expect(findOneSpy).toHaveBeenCalled();
    expect(balance).resolves.toBe(mockAccount.balance);
  });

  it('getBalance method should throw exception', () => {
    const invalidId = 0;

    expect(() => service.getBalance(invalidId)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('blockAccount method should return exception', () => {
    const invalidId = 0;

    expect(() => service.blockAccount(invalidId)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('blockAccount method should call update', async () => {
    const validId = 1;
    jest
      .spyOn(service, 'findOne')
      .mockReturnValue(Promise.resolve(mockAccount));
    jest
      .spyOn(service, 'update')
      .mockReturnValue(Promise.resolve({ id: validId }));

    await service.blockAccount(validId);

    expect(service.update).toHaveBeenCalledWith(validId, { activeFlag: false });
  });

  it('getTransactions method should return exception', () => {
    const invalidId = 0;

    expect(() => service.getTransactions(invalidId)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('getTransactions method should return transactions', () => {
    const validId = 1;

    expect(service.getTransactions(validId)).resolves.toEqual(
      mockAccount.transactions,
    );
  });
});
