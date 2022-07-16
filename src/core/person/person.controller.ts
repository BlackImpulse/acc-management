import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PersonService } from './person.service';

@ApiTags('person')
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}
}
