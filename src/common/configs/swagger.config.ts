import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Acc manager')
  .setVersion('0.1')
  .addBearerAuth()
  .build();
