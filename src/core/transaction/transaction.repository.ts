import { EntityRepository, Repository } from 'typeorm';
import { TransactionEntity } from '../../common/entity/transaction.entity';

@EntityRepository(TransactionEntity)
export class TransactionRepository extends Repository<TransactionEntity> {}
