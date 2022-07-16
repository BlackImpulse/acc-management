import { Injectable, NotFoundException } from '@nestjs/common';
import { PersonRepository } from './person.repository';
import { CreatePersonRequestDto } from './dto/create-person-request.dto';
import { UpdatePersonRequestDto } from './dto/update-person-request.dto';
import { CreatePersonResponseDto } from './dto/create-person-response.dto';
import { UpdatePersonResponseDto } from './dto/update-person-response.dto';
import { PersonEntity } from 'src/common/entity/person.entity';
import { Person } from './model/person';
import { PersonMapper } from './model/person.mapper';

@Injectable()
export class PersonService {
  constructor(private readonly personRepository: PersonRepository) {}

  async create(
    createPersonDto: CreatePersonRequestDto,
  ): Promise<CreatePersonResponseDto> {
    return PersonMapper.convertToModel(
      await this.personRepository.save(createPersonDto),
    );
  }

  async findAll(): Promise<Person[]> {
    const personEntities: PersonEntity[] = await this.personRepository.find();
    return personEntities.map((personEntity) =>
      PersonMapper.convertToModel(personEntity),
    );
  }

  async findOne(id: number): Promise<Person> {
    const personEntity: PersonEntity = await this.personRepository.findOne(id);
    if (!personEntity) {
      throw new NotFoundException('Person not found');
    }
    return PersonMapper.convertToModel(personEntity);
  }

  async update(
    id: number,
    updatePersonDto: UpdatePersonRequestDto,
  ): Promise<UpdatePersonResponseDto> {
    await this.personRepository.update(id, updatePersonDto);
    return { id };
  }

  async remove(id: number): Promise<void> {
    await this.personRepository.delete(id);
  }
}
