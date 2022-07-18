import { ApiProperty } from '@nestjs/swagger';
import { Account } from '../../account/model/account';

export class CreateTransactionResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  value: number;

  @ApiProperty()
  transactionDate: Date;

  @ApiProperty()
  account: Account;
}
