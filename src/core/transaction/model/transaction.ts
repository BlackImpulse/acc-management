import { Account } from '../../account/model/account';

export class Transaction {
  id: number;
  value: number;
  transactionDate: Date;
  account: Account;
}
