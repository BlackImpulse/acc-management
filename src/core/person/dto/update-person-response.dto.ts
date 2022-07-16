import { ApiProperty } from '@nestjs/swagger';

export class UpdatePersonResponseDto {
  @ApiProperty({
    description: 'Person id',
    example: 1,
  })
  id: number;
}
