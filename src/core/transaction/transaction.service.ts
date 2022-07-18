import { Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { TransactionRepository } from './transaction.repository';
import { CreateTransactionRequestDto } from './dto/create-transaction-request.dto';
import { CreateTransactionResponseDto } from './dto/create-transaction-response.dto';
import { TransactionMapper } from './model/transaction.mapper';
import { Transaction } from './model/transaction';
import { TransactionEntity } from '../../common/entity/transaction.entity';
import { UpdateTransactionRequestDto } from './dto/update-transaction-request.dto';
import { UpdateTransactionResponseDto } from './dto/update-transaction-response.dto';
import { AccountService } from '../account/account.service';
import { CreateDepositRequestDto } from './dto/create-deposit-request.dto';
import { CreateDepositResponseDto } from './dto/create-deposit-response.dto';
import { NotActiveAccountException } from '../../common/exceptions/not-active-account.exception';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly accountService: AccountService,
  ) {}

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
      depositValue: depositDto.value,
      newBalance,
    };
  }

  async findAll(): Promise<Transaction[]> {
    const transactionEntities: TransactionEntity[] =
      await this.transactionRepository.find();
    return transactionEntities.map((transactionEntity) =>
      TransactionMapper.convertToModel(transactionEntity),
    );
  }

  async findOne(id: number): Promise<Transaction> {
    const transactionEntity: TransactionEntity =
      await this.transactionRepository.findOne(id);
    if (!transactionEntity) {
      throw new NotFoundException('Transaction not found');
    }
    return TransactionMapper.convertToModel(transactionEntity);
  }

  async update(
    id: number,
    updateTransactionDto: UpdateTransactionRequestDto,
  ): Promise<UpdateTransactionResponseDto> {
    await this.transactionRepository.update(id, updateTransactionDto);
    return { id };
  }

  async remove(id: number): Promise<void> {
    await this.transactionRepository.delete(id);
  }
}
