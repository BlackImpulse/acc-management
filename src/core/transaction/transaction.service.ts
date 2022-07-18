import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionRepository } from './transaction.repository';
import { CreateTransactionRequestDto } from './dto/create-transaction-request.dto';
import { CreateTransactionResponseDto } from './dto/create-transaction-response.dto';
import { TransactionMapper } from './model/transaction.mapper';
import { Transaction } from './model/transaction';
import { TransactionEntity } from '../../common/entity/transaction.entity';
import { UpdateTransactionRequestDto } from './dto/update-transaction-request.dto';
import { UpdateTransactionResponseDto } from './dto/update-transaction-response.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async create(
    createTransactionDto: CreateTransactionRequestDto,
  ): Promise<CreateTransactionResponseDto> {
    return TransactionMapper.convertToModel(
      await this.transactionRepository.save(createTransactionDto),
    );
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
