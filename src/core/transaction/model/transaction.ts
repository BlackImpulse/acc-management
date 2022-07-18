import { Account } from '../../account/model/account';

/**
 * Transaction model
 * @Class
 */
export class Transaction {
  /** Transaction id */
  id: number;
  /** Transaction value */
  value: number;
  /** Transaction date */
  transactionDate: Date;
  /** Transaction account */
  account: Account;
}
