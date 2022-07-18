import { EntityRepository, Repository } from 'typeorm';
import { PersonEntity } from '../../common/entity/person.entity';

/**
 * Person repository
 */
@EntityRepository(PersonEntity)
export class PersonRepository extends Repository<PersonEntity> {}
