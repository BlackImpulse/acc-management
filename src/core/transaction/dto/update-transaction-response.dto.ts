import { ApiProperty } from '@nestjs/swagger';

export class UpdateTransactionResponseDto {
  @ApiProperty({
    description: 'Transaction id',
    example: 1,
  })
  id: number;
}
