import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonRepository } from './person.repository';
import { PersonEntity } from 'src/common/entity/person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonEntity, PersonRepository])],
  providers: [PersonService],
  controllers: [PersonController],
})
export class PersonModule {}
