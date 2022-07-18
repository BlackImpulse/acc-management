import { ApiProperty } from '@nestjs/swagger';
import { PersonDto } from '../../person/dto/person.dto';

export class AccountDto {
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

  @ApiProperty({ type: PersonDto })
  client: PersonDto;
}
