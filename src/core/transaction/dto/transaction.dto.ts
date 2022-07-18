import { ApiProperty } from '@nestjs/swagger';
import { AccountDto } from '../../account/dto/account.dto';

/**
 * Transaction dto
 */
export class TransactionDto {
  @ApiProperty()
  /** Transaction id */
  id: number;

  @ApiProperty()
  /** Transaction value */
  value: number;

  @ApiProperty()
  /** Transaction date */
  transactionDate: Date;

  @ApiProperty({ type: AccountDto })
  /** Transaction account */
  account: AccountDto;
}
