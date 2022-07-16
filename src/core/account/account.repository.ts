import { EntityRepository, Repository } from 'typeorm';
import { AccountEntity } from '../../common/entity/account.entity';

@EntityRepository(AccountEntity)
export class AccountRepository extends Repository<AccountEntity> {}
