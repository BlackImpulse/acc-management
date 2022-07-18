import { Person } from '../../person/model/person';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  balance: number;

  @ApiProperty()
  dailyWithdrawalLimit: number;

  @ApiProperty()
  activeFlag: boolean;

  @ApiProperty()
  accountType: number;

  @ApiProperty()
  createDate: Date;

  @ApiProperty()
  client: Person;
}
