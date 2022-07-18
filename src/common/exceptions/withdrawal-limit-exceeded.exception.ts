import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Withdrawal limit exceeded exception
 */
export class WithdrawalLimitExceededException extends HttpException {
  constructor(dailyWithdrawalLimit: number) {
    super(
      `Daily withdrawal limit exceeded, limit: ${dailyWithdrawalLimit}.`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
