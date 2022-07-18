import { ApiProperty } from '@nestjs/swagger';

/**
 * Update account response dto
 */
export class UpdateAccountResponseDto {
  @ApiProperty({
    description: 'Account id',
    example: 1,
  })
  /** Account id */
  id: number;
}
