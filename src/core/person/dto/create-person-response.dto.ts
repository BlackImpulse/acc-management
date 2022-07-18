import { ApiProperty } from '@nestjs/swagger';

/**
 * Create person response dto
 */
export class CreatePersonResponseDto {
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
