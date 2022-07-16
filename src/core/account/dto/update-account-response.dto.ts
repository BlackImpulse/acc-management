import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccountResponseDto {
  @ApiProperty({
    description: 'Account id',
    example: 1,
  })
  id: number;
}
