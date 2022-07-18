import { ApiProperty } from '@nestjs/swagger';

/**
 * Update person response dto
 */
export class UpdatePersonResponseDto {
  @ApiProperty({
    description: 'Person id',
    example: 1,
  })
  /** Person id */
  id: number;
}
