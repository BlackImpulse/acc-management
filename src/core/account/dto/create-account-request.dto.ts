import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Create account request dto
 */
export class CreateAccountRequestDto {
  @ApiProperty({
    description: 'Person id',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  /** Account person id */
  personId: number;

  @ApiProperty({
    description: 'Account type',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  /** Account type */
  accountType: number;

  @ApiProperty({
    description: 'Account daily withdrawal limit',
    example: '1000',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  /** Account daily withdrawal limit */
  dailyWithdrawalLimit?: number;

  @ApiProperty({
    description: 'Account balance',
    example: 1000,
  })
  @IsOptional()
  @IsNumber()
  /** Account balance */
  balance?: number;

  @ApiProperty({
    description: 'Account active flag',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  /** Account active flag */
  activeFlag?: boolean;
}
