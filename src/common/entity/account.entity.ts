import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { PersonEntity } from './person.entity';
import { TransactionEntity } from './transaction.entity';

/**
 * Account entity
 */
@Entity({ name: 'account' })
export class AccountEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  /** Account id */
  id: number;

  @Column({
    type: 'numeric',
    default: 0,
  })
  /** Account balance */
  balance: number;

  @Column({
    type: 'numeric',
    nullable: true,
  })
  /** Account daily withdrawal limit */
  dailyWithdrawalLimit: number;

  @Column({
    type: 'boolean',
    default: true,
  })
  /** Account active flag */
  activeFlag: boolean;

  @Column({
    type: 'numeric',
  })
  /** Account type */
  accountType: number;

  @Column({
    type: 'timestamp',
  })
  /** Account create date */
  createDate: Date;

  @ManyToOne(() => PersonEntity, (person) => person.id)
  /** Account client */
  client: PersonEntity;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.account)
  /** Account transactions */
  transactions: TransactionEntity[];
}
