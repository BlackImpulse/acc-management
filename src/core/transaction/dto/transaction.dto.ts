import { ApiProperty } from '@nestjs/swagger';
import { AccountDto } from '../../account/dto/account.dto';

export class TransactionDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  value: number;

  @ApiProperty()
  transactionDate: Date;

  @ApiProperty({ type: AccountDto })
  account: AccountDto;
}
