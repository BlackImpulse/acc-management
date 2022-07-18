import { Person } from '../../person/model/person';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Create account response dto
 */
export class CreateAccountResponseDto {
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

  @ApiProperty()
  /** Account client */
  client: Person;
}
