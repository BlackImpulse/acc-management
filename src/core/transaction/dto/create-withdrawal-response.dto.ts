import { ApiProperty } from '@nestjs/swagger';

export class CreateWithdrawalResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  depositValue: number;

  @ApiProperty()
  newBalance: number;
}
