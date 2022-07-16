import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountRepository } from './account.repository';
import { AccountEntity } from '../../common/entity/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity, AccountRepository])],
  providers: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
