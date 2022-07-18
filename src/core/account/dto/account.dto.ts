import { ApiProperty } from '@nestjs/swagger';
import { PersonDto } from '../../person/dto/person.dto';

/**
 * Account dto
 */
export class AccountDto {
  @ApiProperty()
  /** Account id */
  id: number;

  @ApiProperty()
  /** Account balance */
  balance: number;

  @ApiProperty()
  /** Account daily withdrawal limit */
  dailyWithdrawalLimit: number;

  @ApiProperty()
  /** Account active flag */
  activeFlag: boolean;

  @ApiProperty()
  /** Account type */
  accountType: number;

  @ApiProperty()
  /** Account create date */
  createDate: Date;

  @ApiProperty({ type: PersonDto })
  /** Account client */
  client: PersonDto;
}
