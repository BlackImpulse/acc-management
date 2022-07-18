import { ApiProperty } from '@nestjs/swagger';

/**
 * Update transaction response dto
 */
export class UpdateTransactionResponseDto {
  @ApiProperty({
    description: 'Transaction id',
    example: 1,
  })
  /** Transaction id */
  id: number;
}
