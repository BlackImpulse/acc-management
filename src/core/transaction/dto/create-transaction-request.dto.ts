import { IsInt, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Create transaction request dto
 */
export class CreateTransactionRequestDto {
  @ApiProperty({
    description: 'Transaction value',
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  /** Transaction value */
  value: number;

  @ApiProperty({
    description: 'Account id',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  /** Account id */
  accountId: number;
}
