import { Injectable, NotFoundException } from '@nestjs/common';
import { PersonRepository } from './person.repository';
import { CreatePersonRequestDto } from './dto/create-person-request.dto';
import { UpdatePersonRequestDto } from './dto/update-person-request.dto';
import { CreatePersonResponseDto } from './dto/create-person-response.dto';
import { UpdatePersonResponseDto } from './dto/update-person-response.dto';
import { PersonEntity } from 'src/common/entity/person.entity';
import { Person } from './model/person';
import { PersonMapper } from './model/person.mapper';

/** Person service */
@Injectable()
export class PersonService {
  constructor(private readonly personRepository: PersonRepository) {}

  /**
   * Create person
   * @param createPersonDto
   */
  async create(
    createPersonDto: CreatePersonRequestDto,
  ): Promise<CreatePersonResponseDto> {
    return PersonMapper.convertToModel(
      await this.personRepository.save(createPersonDto),
    );
  }

  /**
   * Get all persons
   */
  async findAll(): Promise<Person[]> {
    const personEntities: PersonEntity[] = await this.personRepository.find();
    return personEntities.map((personEntity) =>
      PersonMapper.convertToModel(personEntity),
    );
  }

  /**
   * Get person by id
   * @param id
   */
  async findOne(id: number): Promise<Person> {
    const personEntity: PersonEntity = await this.personRepository.findOne(id);
    if (!personEntity) {
      throw new NotFoundException('Person not found');
    }
    return PersonMapper.convertToModel(personEntity);
  }

  /**
   * Get person by name
   * @param name
   */
  async findByName(name: string): Promise<Person> {
    const personEntity: PersonEntity = await this.personRepository.findOne({
      name: name,
    });
    if (!personEntity) {
      throw new NotFoundException('Person not found');
    }
    return PersonMapper.convertToModel(personEntity);
  }

  /**
   * Update person
   * @param id
   * @param updatePersonDto
   */
  async update(
    id: number,
    updatePersonDto: UpdatePersonRequestDto,
  ): Promise<UpdatePersonResponseDto> {
    await this.personRepository.update(id, updatePersonDto);
    return { id };
  }

  /**
   * Remove person
   * @param id
   */
  async remove(id: number): Promise<void> {
    await this.personRepository.delete(id);
  }
}
