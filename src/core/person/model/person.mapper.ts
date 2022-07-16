import { PersonEntity } from '../../../common/entity/person.entity';
import { Person } from './person';
import { plainToClass } from 'class-transformer';

export class PersonMapper {
  static convertToEntity(personModel: Person): PersonEntity {
    const personEntity = {
      id: personModel.id,
      name: personModel.name,
      document: personModel.document,
      birthDate: personModel.birthDate,
    };
    return plainToClass(PersonEntity, personEntity);
  }

  static convertToModel(personEntity: PersonEntity): Person {
    const person = {
      id: personEntity.id,
      name: personEntity.name,
      document: personEntity.document,
      birthDate: personEntity.birthDate,
    };
    return plainToClass(Person, person);
  }
}
