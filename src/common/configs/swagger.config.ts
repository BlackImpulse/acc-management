import { DocumentBuilder } from '@nestjs/swagger';

/**
 * Swagger config
 */
export const swaggerConfig = new DocumentBuilder()
  .setTitle('Acc manager')
  .setVersion('0.1')
  .addBearerAuth()
  .build();
