import { Person } from '../../person/model/person';

/**
 * Account model
 * @Class
 */
export class Account {
  /** Account id */
  id: number;
  /** Account balance */
  balance: number;
  /** Account daily withdrawal limit */
  dailyWithdrawalLimit: number;
  /** Account active flag */
  activeFlag: boolean;
  /** Account type */
  accountType: number;
  /** Account create date */
  createDate: Date;
  /** Account client */
  client: Person;
}
