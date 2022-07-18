import { ApiProperty } from '@nestjs/swagger';

/**
 * Create withdrawal response dto
 */
export class CreateWithdrawalResponseDto {
  @ApiProperty()
  /** Withdrawal id */
  id: number;

  @ApiProperty()
  /** Withdrawal value */
  value: number;

  @ApiProperty()
  /** New balance after withdrawal */
  newBalance: number;
}
