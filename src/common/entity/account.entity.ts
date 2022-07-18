import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { PersonEntity } from './person.entity';
import { TransactionEntity } from './transaction.entity';

@Entity({ name: 'account' })
export class AccountEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'numeric',
    default: 0,
  })
  balance: number;

  @Column({
    type: 'numeric',
    nullable: true,
  })
  dailyWithdrawalLimit: number;

  @Column({
    type: 'boolean',
    default: true,
  })
  activeFlag: boolean;

  @Column({
    type: 'numeric',
  })
  accountType: number;

  @Column({
    type: 'timestamp',
  })
  createDate: Date;

  @ManyToOne(() => PersonEntity, (person) => person.id)
  client: PersonEntity;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.account)
  transactions: TransactionEntity[];
}
