import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

/**
 * Login request dto
 */
export class LoginRequestDto {
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  /** User name */
  name: string;
}
