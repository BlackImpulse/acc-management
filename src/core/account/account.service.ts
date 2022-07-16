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

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly personService: PersonService,
  ) {}

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

  async findAll(): Promise<Account[]> {
    const accountEntities: AccountEntity[] =
      await this.accountRepository.find();
    return accountEntities.map((accountEntity) =>
      AccountMapper.convertToModel(accountEntity),
    );
  }

  async findOne(id: number): Promise<Account> {
    const accountEntity = await this.accountRepository.findOne(id);
    if (!accountEntity) {
      throw new NotFoundException('Account not found');
    }
    return AccountMapper.convertToModel(accountEntity);
  }

  async update(
    id: number,
    updateAccountDto: UpdateAccountRequestDto,
  ): Promise<UpdateAccountResponseDto> {
    await this.accountRepository.update(id, updateAccountDto);
    return { id };
  }

  async remove(id: number): Promise<void> {
    await this.accountRepository.delete(id);
  }
}
