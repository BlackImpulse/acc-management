import { EntityRepository, Repository } from 'typeorm';
import { AccountEntity } from '../../common/entity/account.entity';

/**
 * Account repository
 */
@EntityRepository(AccountEntity)
export class AccountRepository extends Repository<AccountEntity> {}
