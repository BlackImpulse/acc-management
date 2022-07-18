import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class LoginUserRequestDto {
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  name: string;
}
