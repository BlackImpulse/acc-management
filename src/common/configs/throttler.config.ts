import { ThrottlerModuleOptions } from '@nestjs/throttler/dist/throttler-module-options.interface';

/**
 * Throttler config
 */
export const throttlerConfig: ThrottlerModuleOptions = {
  ttl: 60,
  limit: 15,
};
