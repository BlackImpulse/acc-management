import { Person } from '../../person/model/person';

export class Account {
  id: number;
  balance: number;
  dailyWithdrawalLimit: number;
  activeFlag: boolean;
  accountType: number;
  createDate: Date;
  client: Person;
}
