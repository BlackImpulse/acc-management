import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  HttpStatus,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePersonRequestDto } from './dto/create-person-request.dto';
import { UpdatePersonRequestDto } from './dto/update-person-request.dto';
import { CreatePersonResponseDto } from './dto/create-person-response.dto';
import { UpdatePersonResponseDto } from './dto/update-person-response.dto';
import { PersonService } from './person.service';
import { ThrottlerGuard } from '@nestjs/throttler';
import { RequestLogInterceptor } from '../../common/interceptors/request-log.interceptor';
import { PersonDto } from './dto/person.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

/** Person controller */
@UseInterceptors(RequestLogInterceptor)
@UseGuards(ThrottlerGuard)
@ApiTags('person')
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  /** Create person */
  @ApiOperation({ summary: 'Create person' })
  @ApiResponse({ status: HttpStatus.CREATED, type: CreatePersonResponseDto })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body() createPersonDto: CreatePersonRequestDto,
  ): Promise<CreatePersonResponseDto> {
    return this.personService.create(createPersonDto);
  }

  /** Get all persons */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all persons' })
  @ApiResponse({ status: HttpStatus.OK, type: [PersonDto] })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<PersonDto[]> {
    return this.personService.findAll();
  }

  /** Get person by id */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get person by id' })
  @ApiResponse({ status: HttpStatus.OK, type: PersonDto })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<PersonDto> {
    return this.personService.findOne(id);
  }

  /** Update person */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update person' })
  @ApiResponse({ status: HttpStatus.OK, type: UpdatePersonResponseDto })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePersonDto: UpdatePersonRequestDto,
  ): Promise<UpdatePersonResponseDto> {
    return this.personService.update(id, updatePersonDto);
  }

  /** Remove person */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Remove person' })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.personService.remove(id);
  }
}
