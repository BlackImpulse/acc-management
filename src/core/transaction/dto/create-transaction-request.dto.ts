import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionRequestDto {
  @ApiProperty({
    description: 'Transaction value',
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
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
