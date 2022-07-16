import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({ name: 'person' })
export class PersonEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'text',
  })
  name: string;

  @Column({
    type: 'text',
  })
  document: string;

  @Column({
    type: 'date',
  })
  birthDate: Date;
}
