import { CreatePersonRequestDto } from './create-person-request.dto';
import { PartialType } from '@nestjs/swagger';

/**
 * Update person request dto
 */
export class UpdatePersonRequestDto extends PartialType(
  CreatePersonRequestDto,
) {}
