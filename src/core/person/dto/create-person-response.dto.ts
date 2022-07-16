import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  document: string;

  @ApiProperty()
  birthDate: Date;
}
