import { Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, LessThan, MoreThan } from 'typeorm';
import { TransactionRepository } from './transaction.repository';
import { CreateTransactionRequestDto } from './dto/create-transaction-request.dto';
import { CreateTransactionResponseDto } from './dto/create-transaction-response.dto';
import { TransactionMapper } from './model/transaction.mapper';
import { Transaction } from './model/transaction';
import { TransactionEntity } from '../../common/entity/transaction.entity';
import { UpdateTransactionRequestDto } from './dto/update-transaction-request.dto';
import { UpdateTransactionResponseDto } from './dto/update-transaction-response.dto';
import { CreateDepositRequestDto } from './dto/create-deposit-request.dto';
import { CreateWithdrawalRequestDto } from './dto/create-withdrawal-request.dto';
import { NotEnoughMoneyException } from '../../common/exceptions/not-enough-money.exception';
import { WithdrawalLimitExceededException } from '../../common/exceptions/withdrawal-limit-exceeded.exception';
import { CreateWithdrawalResponseDto } from './dto/create-withdrawal-response.dto';
import { CreateDepositResponseDto } from './dto/create-deposit-response.dto';
import { NotActiveAccountException } from '../../common/exceptions/not-active-account.exception';
import { AccountService } from '../account/account.service';
import * as moment from 'moment';

/** Transaction service */
@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly accountService: AccountService,
  ) {}

  /**
   * Create transaction
   * @param createTransactionDto
   */
  async create(
    createTransactionDto: CreateTransactionRequestDto,
  ): Promise<CreateTransactionResponseDto> {
    const transaction: DeepPartial<TransactionEntity> = {
      value: createTransactionDto.value,
      account: { id: createTransactionDto.accountId },
      transactionDate: new Date(),
    };

    return TransactionMapper.convertToModel(
      await this.transactionRepository.save(transaction),
    );
  }

  /**
   * Create deposit
   * @param depositDto
   */
  async deposit(
    depositDto: CreateDepositRequestDto,
  ): Promise<CreateDepositResponseDto> {
    const account = await this.accountService.findOne(depositDto.accountId);

    if (!account.activeFlag) {
      throw new NotActiveAccountException();
    }

    const newBalance = account.balance + depositDto.value;
    await this.accountService.update(depositDto.accountId, {
      balance: newBalance,
    });

    await this.create({
      value: +depositDto.value,
      accountId: depositDto.accountId,
    });

    return {
      id: depositDto.accountId,
      value: depositDto.value,
      newBalance,
    };
  }

  /**
   * Create withdrawal
   * @param withdrawalDto
   */
  async withdrawal(
    withdrawalDto: CreateWithdrawalRequestDto,
  ): Promise<CreateWithdrawalResponseDto> {
    const account = await this.accountService.findOne(withdrawalDto.accountId);

    if (!account.activeFlag) {
      throw new NotActiveAccountException();
    }

    const newBalance = Number(account.balance) - Number(withdrawalDto.value);
    if (newBalance < 0) {
      throw new NotEnoughMoneyException(account.balance);
    }

    const dailyWithdrawalLimit = account.dailyWithdrawalLimit;
    const todayWithdrawalTransactionsSum =
      await this.todayWithdrawalTransactionsSum(withdrawalDto.accountId);
    if (Math.abs(todayWithdrawalTransactionsSum) >= dailyWithdrawalLimit) {
      throw new WithdrawalLimitExceededException(dailyWithdrawalLimit);
    }

    await this.accountService.update(withdrawalDto.accountId, {
      balance: newBalance,
    });

    await this.create({
      value: -withdrawalDto.value,
      accountId: withdrawalDto.accountId,
    });

    return {
      id: withdrawalDto.accountId,
      value: withdrawalDto.value,
      newBalance,
    };
  }

  /**
   * Get sum of today withdrawal transactions
   * @param accountId
   */
  async todayWithdrawalTransactionsSum(accountId: number): Promise<number> {
    const today = moment();
    today.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

    const todayWithdrawalTransactions = await this.transactionRepository.find({
      account: { id: accountId },
      value: LessThan(0),
      transactionDate: MoreThan(today.toDate()),
    });

    return todayWithdrawalTransactions.reduce(
      (sum, transaction) => Number(transaction.value) + sum,
      0,
    );
  }

  /**
   * Get all transactions
   */
  async findAll(): Promise<Transaction[]> {
    const transactionEntities: TransactionEntity[] =
      await this.transactionRepository.find();
    return transactionEntities.map((transactionEntity) =>
      TransactionMapper.convertToModel(transactionEntity),
    );
  }

  /**
   * Get transaction by id
   * @param id
   */
  async findOne(id: number): Promise<Transaction> {
    const transactionEntity: TransactionEntity =
      await this.transactionRepository.findOne(id);
    if (!transactionEntity) {
      throw new NotFoundException('Transaction not found');
    }
    return TransactionMapper.convertToModel(transactionEntity);
  }

  /**
   * Update transaction
   * @param id
   * @param updateTransactionDto
   */
  async update(
    id: number,
    updateTransactionDto: UpdateTransactionRequestDto,
  ): Promise<UpdateTransactionResponseDto> {
    await this.transactionRepository.update(id, updateTransactionDto);
    return { id };
  }

  /**
   * Remove transaction
   * @param id
   */
  async remove(id: number): Promise<void> {
    await this.transactionRepository.delete(id);
  }
}
