import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { TransactionRepository } from './transaction.repository';
import { AccountService } from '../account/account.service';
import { CreateDepositRequestDto } from './dto/create-deposit-request.dto';
import { NotActiveAccountException } from '../../common/exceptions/not-active-account.exception';
import { NotFoundException } from '@nestjs/common';

describe('Account service', () => {
  let service: TransactionService;

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

  const mockTransactionRepository = {};

  const mockAccountService = {
    findOne: jest.fn().mockImplementation((id) => {
      if (id !== 1) {
        throw new NotFoundException();
      }
      return Promise.resolve(mockAccount);
    }),
    update: jest.fn().mockReturnValue(Promise.resolve({ id: mockAccount.id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        { provide: TransactionRepository, useValue: mockTransactionRepository },
        { provide: AccountService, useValue: mockAccountService },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deposit method should call update account balance', async () => {
    const createDepositDto: CreateDepositRequestDto = {
      accountId: 1,
      value: 100,
    };
    jest.spyOn(service, 'create').mockReturnValue(Promise.resolve(undefined));

    await service.deposit(createDepositDto);

    expect(mockAccountService.findOne).toHaveBeenCalled();
    expect(mockAccountService.update).toHaveBeenCalled();
  });

  it('deposit method should call create transaction', async () => {
    const createDepositDto: CreateDepositRequestDto = {
      accountId: 1,
      value: 100,
    };
    jest.spyOn(service, 'create').mockReturnValue(Promise.resolve(undefined));

    await service.deposit(createDepositDto);

    expect(service.create).toHaveBeenCalledWith({
      value: createDepositDto.value,
      accountId: createDepositDto.accountId,
    });
  });

  it('deposit method should throw NotFoundException', () => {
    const createDepositDto: CreateDepositRequestDto = {
      accountId: 0,
      value: 100,
    };

    expect(() => service.deposit(createDepositDto)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('deposit method should throw NotActiveAccountException', () => {
    const createDepositDto: CreateDepositRequestDto = {
      accountId: 1,
      value: 100,
    };
    jest
      .spyOn(mockAccountService, 'findOne')
      .mockReturnValue(Promise.resolve({ ...mockAccount, activeFlag: false }));

    expect(() => service.deposit(createDepositDto)).rejects.toThrow(
      NotActiveAccountException,
    );
  });
});
