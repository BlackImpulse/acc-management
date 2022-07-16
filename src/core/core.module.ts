import { Module } from '@nestjs/common';
import { PersonModule } from './person/person.module';

const MODULES = [PersonModule];

@Module({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class CoreModule {}
