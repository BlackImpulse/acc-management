import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { AccountEntity } from './account.entity';

/**
 * Transaction entity
 */
@Entity({ name: 'transaction' })
export class TransactionEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  /** Transaction id */
  id: number;

  @Column({
    type: 'numeric',
  })
  /** Transaction value */
  value: number;

  @Column({
    type: 'timestamp',
  })
  /** Transaction date */
  transactionDate: Date;

  @ManyToOne(() => AccountEntity, (account) => account.id)
  /** Transaction account */
  account: AccountEntity;
}
