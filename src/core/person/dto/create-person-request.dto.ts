import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import * as moment from 'moment';

export class CreatePersonRequestDto {
  @ApiProperty({
    description: 'Person name',
    example: 'Sergei',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Person document',
    example: 'document',
  })
  @IsNotEmpty()
  @IsString()
  document: string;

  @ApiProperty({
    description: 'Person birth date',
    example: '2001-12-22',
  })
  @IsNotEmpty()
  @Transform(({ value }) => moment(value).toDate())
  birthDate: Date;
}
