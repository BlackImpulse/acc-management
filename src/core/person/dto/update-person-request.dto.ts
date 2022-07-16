import { CreatePersonRequestDto } from './create-person-request.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdatePersonRequestDto extends PartialType(
  CreatePersonRequestDto,
) {}
