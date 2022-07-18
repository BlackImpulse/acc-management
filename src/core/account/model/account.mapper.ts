import { plainToClass } from 'class-transformer';
import { Account } from './account';
import { AccountEntity } from '../../../common/entity/account.entity';
import { PersonMapper } from '../../person/model/person.mapper';

/**
 * Account mapper
 * @Class
 */
export class AccountMapper {
  static convertToEntity(accountModel: Account): AccountEntity {
    const accountEntity = {
      id: accountModel.id,
      balance: accountModel.balance,
      dailyWithdrawalLimit: accountModel.dailyWithdrawalLimit,
      activeFlag: accountModel.activeFlag,
      accountType: accountModel.accountType,
      createDate: accountModel.createDate,
      client:
        accountModel.client &&
        PersonMapper.convertToEntity(accountModel.client),
    };
    return plainToClass(AccountEntity, accountEntity);
  }

  static convertToModel(accountEntity: AccountEntity): Account {
    const account = {
      id: accountEntity.id,
      balance: +accountEntity.balance,
      dailyWithdrawalLimit: +accountEntity.dailyWithdrawalLimit,
      activeFlag: accountEntity.activeFlag,
      accountType: accountEntity.accountType,
      createDate: accountEntity.createDate,
      client:
        accountEntity.client &&
        PersonMapper.convertToModel(accountEntity.client),
    };
    return plainToClass(Account, account);
  }
}
