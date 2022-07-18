import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Not enough money exception
 */
export class NotEnoughMoneyException extends HttpException {
  constructor(balance: number) {
    super(
      `There are not enough money on the balance, balance: ${balance}.`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
