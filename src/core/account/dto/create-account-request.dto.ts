import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountRequestDto {
  @ApiProperty({
    description: 'Person id',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  personId: number;

  @ApiProperty({
    description: 'Account type',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  accountType: number;

  @ApiProperty({
    description: 'Account daily withdrawal limit',
    example: '1000',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  dailyWithdrawalLimit?: number;

  @ApiProperty({
    description: 'Account balance',
    example: 1000,
  })
  @IsOptional()
  @IsNumber()
  balance?: number;

  @ApiProperty({
    description: 'Account active flag',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  activeFlag?: boolean;
}
