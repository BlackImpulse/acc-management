import { PartialType } from '@nestjs/swagger';
import { CreateTransactionRequestDto } from './create-transaction-request.dto';

/**
 * Update transaction request dto
 */
export class UpdateTransactionRequestDto extends PartialType(
  CreateTransactionRequestDto,
) {}
