import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Not active account exception
 */
export class NotActiveAccountException extends HttpException {
  constructor() {
    super('Account not active', HttpStatus.BAD_REQUEST);
  }
}
