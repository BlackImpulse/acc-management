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
  Put,
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
import { AccountService } from './account.service';
import { CreateAccountRequestDto } from './dto/create-account-request.dto';
import { CreateAccountResponseDto } from './dto/create-account-response.dto';
import { UpdateAccountRequestDto } from './dto/update-account-request.dto';
import { UpdateAccountResponseDto } from './dto/update-account-response.dto';
import { RequestLogInterceptor } from '../../common/interceptors/request-log.interceptor';
import { TransactionDto } from '../transaction/dto/transaction.dto';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AccountDto } from './dto/account.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

/** Account controller */
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(RequestLogInterceptor)
@UseGuards(ThrottlerGuard)
@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  /** Block account */
  @ApiOperation({ summary: 'Block account' })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateAccountResponseDto })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.OK)
  @Put('block/:id')
  async blockAccount(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UpdateAccountResponseDto> {
    return this.accountService.blockAccount(id);
  }

  /** Create account */
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

  /** Get balance */
  @ApiOperation({ summary: 'Get balance' })
  @ApiResponse({ status: HttpStatus.OK, type: Number })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.OK)
  @Get('balance/:id')
  async getBalance(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.accountService.getBalance(id);
  }

  /** Get transactions */
  @ApiOperation({ summary: 'Get transactions' })
  @ApiResponse({ status: HttpStatus.OK, type: [TransactionDto] })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.OK)
  @Get('transactions/:id')
  async getTransactions(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TransactionDto[]> {
    return this.accountService.getTransactions(id);
  }

  /** Get all accounts */
  @ApiOperation({ summary: 'Get all accounts' })
  @ApiResponse({ status: HttpStatus.OK, type: [AccountDto] })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<AccountDto[]> {
    return this.accountService.findAll();
  }

  /** Get account by id */
  @ApiOperation({ summary: 'Get account by id' })
  @ApiResponse({ status: HttpStatus.OK, type: AccountDto })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<AccountDto> {
    return this.accountService.findOne(id);
  }

  /** Update account */
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

  /** Remove account */
  @ApiOperation({ summary: 'Remove account' })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.accountService.remove(id);
  }
}
