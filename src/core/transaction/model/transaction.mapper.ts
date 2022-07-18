import { plainToClass } from 'class-transformer';
import { Transaction } from './transaction';
import { TransactionEntity } from '../../../common/entity/transaction.entity';
import { AccountMapper } from '../../account/model/account.mapper';

/**
 * Transaction mapper
 * @Class
 */
export class TransactionMapper {
  static convertToEntity(transactionModel: Transaction): TransactionEntity {
    const transactionEntity = {
      id: transactionModel.id,
      value: transactionModel.value,
      transactionDate: transactionModel.transactionDate,
      account:
        transactionModel.account &&
        AccountMapper.convertToEntity(transactionModel.account),
    };
    return plainToClass(TransactionEntity, transactionEntity);
  }

  static convertToModel(transactionEntity: TransactionEntity): Transaction {
    const transactionModel = {
      id: transactionEntity.id,
      value: transactionEntity.value,
      transactionDate: transactionEntity.transactionDate,
      account:
        transactionEntity.account &&
        AccountMapper.convertToModel(transactionEntity.account),
    };
    return plainToClass(Transaction, transactionModel);
  }
}
