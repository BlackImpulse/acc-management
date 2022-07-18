import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { WinstonModule } from 'nest-winston';
import { CoreModule } from './core/core.module';
import { typeOrmConfigAsync } from './common/configs/type-orm.config';
import { throttlerConfig } from './common/configs/throttler.config';
import { winstonLoggerConfig } from './common/configs/winston-logger.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot(throttlerConfig),
    WinstonModule.forRoot(winstonLoggerConfig),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    CoreModule,
  ],
})
export class AppModule {}
