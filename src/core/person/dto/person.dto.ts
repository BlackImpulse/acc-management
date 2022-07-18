import { ApiProperty } from '@nestjs/swagger';

export class PersonDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  document: string;

  @ApiProperty()
  birthDate: Date;
}
