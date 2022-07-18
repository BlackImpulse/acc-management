import { ApiProperty } from '@nestjs/swagger';

/**
 * Login response dto
 */
export class LoginResponseDto {
  @ApiProperty()
  /** Access token */
  access_token: string;
}
