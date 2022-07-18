import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

/**
 * Create withdrawal request dto
 */
export class CreateWithdrawalRequestDto {
  @ApiProperty({
    description: 'Transaction value',
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  /** Transaction value */
  value: number;

  @ApiProperty({
    description: 'Account id',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  /** Transaction account id */
  accountId: number;
}
