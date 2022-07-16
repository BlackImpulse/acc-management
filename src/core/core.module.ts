import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { PersonModule } from './person/person.module';

const MODULES = [AccountModule, PersonModule];

@Module({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class CoreModule {}
