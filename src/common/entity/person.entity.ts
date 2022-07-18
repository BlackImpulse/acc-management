import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

/**
 * Person entity
 */
@Entity({ name: 'person' })
export class PersonEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  /** Person id */
  id: number;

  @Column({
    type: 'text',
  })
  /** Person name */
  name: string;

  @Column({
    type: 'text',
  })
  /** Person document */
  document: string;

  @Column({
    type: 'date',
  })
  /** Person birthdate */
  birthDate: Date;
}
