import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountRepository } from './account.repository';
import { AccountEntity } from '../../common/entity/account.entity';
import { PersonModule } from '../person/person.module';

/**
 * Account module
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity, AccountRepository]),
    PersonModule,
  ],
  providers: [AccountService],
  controllers: [AccountController],
  exports: [AccountService],
})
export class AccountModule {}
