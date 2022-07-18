import { Injectable, NotFoundException } from '@nestjs/common';
import { PersonService } from '../person/person.service';
import { AccountRepository } from './account.repository';
import { CreateAccountRequestDto } from './dto/create-account-request.dto';
import { CreateAccountResponseDto } from './dto/create-account-response.dto';
import { AccountEntity } from '../../common/entity/account.entity';
import { PersonMapper } from '../person/model/person.mapper';
import { Account } from './model/account';
import { AccountMapper } from './model/account.mapper';
import { UpdateAccountRequestDto } from './dto/update-account-request.dto';
import { UpdateAccountResponseDto } from './dto/update-account-response.dto';
import { TransactionMapper } from '../transaction/model/transaction.mapper';
import { Transaction } from '../transaction/model/transaction';

/** Account service */
@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly personService: PersonService,
  ) {}

  /**
   * Block account
   * @param id
   */
  async blockAccount(id: number): Promise<UpdateAccountResponseDto> {
    await this.findOne(id);
    return this.update(id, { activeFlag: false });
  }

  /**
   * Create account
   * @param createAccountDto
   */
  async create(
    createAccountDto: CreateAccountRequestDto,
  ): Promise<CreateAccountResponseDto> {
    const person = await this.personService.findOne(createAccountDto.personId);

    const account: Partial<AccountEntity> = {
      client: PersonMapper.convertToEntity(person),
      accountType: createAccountDto.accountType,
      balance: createAccountDto.balance,
      dailyWithdrawalLimit: createAccountDto.dailyWithdrawalLimit,
      createDate: new Date(),
    };

    return this.accountRepository.save(account);
  }

  /**
   * Get accounte balance
   * @param id
   */
  async getBalance(id: number): Promise<number> {
    const account = await this.findOne(id);
    return account.balance;
  }

  /**
   * Get account transactions
   * @param id
   */
  async getTransactions(id: number): Promise<Transaction[]> {
    const accountEntity = await this.accountRepository.findOne(id, {
      relations: ['transactions'],
    });
    if (!accountEntity) {
      throw new NotFoundException('Account not found');
    }
    return accountEntity.transactions.map((transaction) =>
      TransactionMapper.convertToModel(transaction),
    );
  }

  /**
   * Get all accounts
   */
  async findAll(): Promise<Account[]> {
    const accountEntities: AccountEntity[] =
      await this.accountRepository.find();
    return accountEntities.map((accountEntity) =>
      AccountMapper.convertToModel(accountEntity),
    );
  }

  /**
   * Get account by id
   * @param id
   */
  async findOne(id: number): Promise<Account> {
    const accountEntity = await this.accountRepository.findOne(id);
    if (!accountEntity) {
      throw new NotFoundException('Account not found');
    }
    return AccountMapper.convertToModel(accountEntity);
  }

  /**
   * Update account
   * @param id
   * @param updateAccountDto
   */
  async update(
    id: number,
    updateAccountDto: UpdateAccountRequestDto,
  ): Promise<UpdateAccountResponseDto> {
    await this.accountRepository.update(id, updateAccountDto);
    return { id };
  }

  /**
   * Remove account
   * @param id
   */
  async remove(id: number): Promise<void> {
    await this.accountRepository.delete(id);
  }
}
