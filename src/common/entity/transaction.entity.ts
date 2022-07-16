import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { AccountEntity } from './account.entity';

@Entity({ name: 'transaction' })
export class TransactionEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'numeric',
  })
  value: number;

  @Column({
    type: 'timestamp',
  })
  transactionDate: Date;

  @ManyToOne(() => AccountEntity, (account) => account.id)
  account: AccountEntity;
}
