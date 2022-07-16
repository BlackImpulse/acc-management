import { plainToClass } from 'class-transformer';
import { Account } from './account';
import { AccountEntity } from '../../../common/entity/account.entity';
import { PersonMapper } from '../../person/model/person.mapper';

export class AccountMapper {
  static convertToEntity(accountModel: Account): AccountEntity {
    const accountEntity = {
      id: accountModel.id,
      balance: accountModel.balance,
      dailyWithdrawalLimit: accountModel.dailyWithdrawalLimit,
      activeFlag: accountModel.activeFlag,
      accountType: accountModel.accountType,
      createDate: accountModel.createDate,
      person: PersonMapper.convertToEntity(accountModel.client),
    };
    return plainToClass(AccountEntity, accountEntity);
  }

  static convertToModel(accountEntity: AccountEntity): Account {
    const account = {
      ...accountEntity,
    };
    return plainToClass(Account, account);
  }
}
