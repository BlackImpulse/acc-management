import { ApiProperty } from '@nestjs/swagger';

/**
 * Create deposit response dto
 */
export class CreateDepositResponseDto {
  @ApiProperty()
  /** Deposit id */
  id: number;

  @ApiProperty()
  /** Deposit value */
  value: number;

  @ApiProperty()
  /** New balance after deposit */
  newBalance: number;
}
