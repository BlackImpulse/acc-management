import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginRequestDto } from './dto/login-request.dto';
import { JwtService } from '@nestjs/jwt';
import { PersonService } from '../person/person.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly personService: PersonService,
  ) {}

  /**
   * Login person
   * @param loginUserDto
   */
  async login(loginUserDto: LoginRequestDto) {
    const person = await this.personService.findByName(loginUserDto.name);
    if (!person) {
      throw new BadRequestException('Person does not exist');
    }

    const payload = { sub: person.id, name: person.name };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
