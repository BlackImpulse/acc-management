import { ApiProperty } from '@nestjs/swagger';
import { Account } from '../../account/model/account';

/**
 * Create transaction response dto
 */
export class CreateTransactionResponseDto {
  @ApiProperty()
  /** Transaction id */
  id: number;

  @ApiProperty()
  /** Transaction value */
  value: number;

  @ApiProperty()
  /** Transaction date */
  transactionDate: Date;

  @ApiProperty()
  /** Transaction account */
  account: Account;
}
