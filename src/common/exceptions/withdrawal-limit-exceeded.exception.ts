import { HttpException, HttpStatus } from '@nestjs/common';

export class WithdrawalLimitExceededException extends HttpException {
  constructor(dailyWithdrawalLimit: number) {
    super(
      `Daily withdrawal limit exceeded, limit: ${dailyWithdrawalLimit}.`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
