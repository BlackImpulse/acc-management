import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AccountService } from './account.service';
import { CreateAccountRequestDto } from './dto/create-account-request.dto';
import { CreateAccountResponseDto } from './dto/create-account-response.dto';
import { UpdateAccountRequestDto } from './dto/update-account-request.dto';
import { UpdateAccountResponseDto } from './dto/update-account-response.dto';
import { Account } from './model/account';

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiOperation({ summary: 'Create account' })
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateAccountResponseDto })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body() createAccountDto: CreateAccountRequestDto,
  ): Promise<CreateAccountResponseDto> {
    return this.accountService.create(createAccountDto);
  }

  @ApiOperation({ summary: 'Get balance' })
  @ApiResponse({ status: HttpStatus.OK, type: Number })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.OK)
  @Get('balance/:id')
  async getBalance(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.accountService.getBalance(id);
  }

  @ApiOperation({ summary: 'Get all accounts' })
  @ApiResponse({ status: HttpStatus.OK, type: Account })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<Account[]> {
    return this.accountService.findAll();
  }

  @ApiOperation({ summary: 'Get account by id' })
  @ApiResponse({ status: HttpStatus.OK, type: Account })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Account> {
    return this.accountService.findOne(id);
  }

  @ApiOperation({ summary: 'Update account' })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateAccountResponseDto })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePersonDto: UpdateAccountRequestDto,
  ): Promise<UpdateAccountResponseDto> {
    return this.accountService.update(id, updatePersonDto);
  }

  @ApiOperation({ summary: 'Remove account' })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.accountService.remove(id);
  }
}
