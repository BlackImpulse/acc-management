import { ConfigModule, ConfigService } from '@nestjs/config';

/**
 * Jwt config
 */
export const jwtConfig = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get('SECRET_KEY'),
    signOptions: {
      expiresIn: configService.get('EXPIRES_IN'),
    },
  }),
};
