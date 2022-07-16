import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { PersonEntity } from './person.entity';

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
}
