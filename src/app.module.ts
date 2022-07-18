import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { CoreModule } from './core/core.module';
import { typeOrmConfigAsync } from './common/configs/type-orm.config';
import { throttlerConfig } from './common/configs/throttler.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot(throttlerConfig),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    CoreModule,
  ],
})
export class AppModule {}
