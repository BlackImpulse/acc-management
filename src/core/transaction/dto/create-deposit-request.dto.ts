import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator';

export class CreateDepositRequestDto {
  @ApiProperty({
    description: 'Transaction value',
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  value: number;

  @ApiProperty({
    description: 'Account id',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  accountId: number;
}
