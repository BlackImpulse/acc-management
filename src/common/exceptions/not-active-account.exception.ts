import { HttpException, HttpStatus } from '@nestjs/common';

export class NotActiveAccountException extends HttpException {
  constructor() {
    super('Account not active', HttpStatus.BAD_REQUEST);
  }
}
