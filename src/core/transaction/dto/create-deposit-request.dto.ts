import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

/**
 * Create deposit request dto
 */
export class CreateDepositRequestDto {
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
  /** Account id */
  accountId: number;
}
