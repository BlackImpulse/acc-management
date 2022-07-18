import { ApiProperty } from '@nestjs/swagger';

/**
 * Person dto
 */
export class PersonDto {
  @ApiProperty()
  /** Person id */
  id: number;

  @ApiProperty()
  /** Person name */
  name: string;

  @ApiProperty()
  /** Person document */
  document: string;

  @ApiProperty()
  /** Person birthdate */
  birthDate: Date;
}
