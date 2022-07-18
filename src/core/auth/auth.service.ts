import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginUserRequestDto } from './dto/login-user-request.dto';
import { JwtService } from '@nestjs/jwt';
import { PersonService } from '../person/person.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly personService: PersonService,
  ) {}

  async login(loginUserDto: LoginUserRequestDto) {
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
