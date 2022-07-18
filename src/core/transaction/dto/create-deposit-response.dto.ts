import { ApiProperty } from '@nestjs/swagger';

export class CreateDepositResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  depositValue: number;

  @ApiProperty()
  newBalance: number;
}
