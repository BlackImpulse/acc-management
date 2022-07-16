import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { PersonModule } from './person/person.module';
import { TransactionModule } from './transaction/transaction.module';

const MODULES = [AccountModule, PersonModule, TransactionModule];

@Module({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class CoreModule {}
