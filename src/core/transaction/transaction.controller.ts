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
import { TransactionService } from './transaction.service';
import { UpdateTransactionRequestDto } from './dto/update-transaction-request.dto';
import { UpdateTransactionResponseDto } from './dto/update-transaction-response.dto';
import { CreateDepositRequestDto } from './dto/create-deposit-request.dto';
import { CreateDepositResponseDto } from './dto/create-deposit-response.dto';
import { CreateWithdrawalRequestDto } from './dto/create-withdrawal-request.dto';
import { CreateWithdrawalResponseDto } from './dto/create-withdrawal-response.dto';
import { ThrottlerGuard } from '@nestjs/throttler';
import { RequestLogInterceptor } from '../../common/interceptors/request-log.interceptor';
import { TransactionDto } from './dto/transaction.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

/** Transaction controller */
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(RequestLogInterceptor)
@UseGuards(ThrottlerGuard)
@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  /** Create deposit */
  @ApiOperation({ summary: 'Create deposit' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateDepositResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.CREATED)
  @Post('deposit')
  async deposit(
    @Body() createDepositDto: CreateDepositRequestDto,
  ): Promise<CreateDepositResponseDto> {
    return this.transactionService.deposit(createDepositDto);
  }

  /** Create withdrawal */
  @ApiOperation({ summary: 'Create withdrawal' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateWithdrawalResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.CREATED)
  @Post('withdrawal')
  async withdrawal(
    @Body() createWithdrawalDto: CreateWithdrawalRequestDto,
  ): Promise<CreateWithdrawalResponseDto> {
    return this.transactionService.withdrawal(createWithdrawalDto);
  }

  /** Get all transactions */
  @ApiOperation({ summary: 'Get all transactions' })
  @ApiResponse({ status: HttpStatus.OK, type: [TransactionDto] })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<TransactionDto[]> {
    return this.transactionService.findAll();
  }

  /** Get transaction by id */
  @ApiOperation({ summary: 'Get transaction by id' })
  @ApiResponse({ status: HttpStatus.OK, type: TransactionDto })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TransactionDto> {
    return this.transactionService.findOne(id);
  }

  /** Update transaction */
  @ApiOperation({ summary: 'Update transaction' })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateTransactionResponseDto })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTransactionDto: UpdateTransactionRequestDto,
  ): Promise<UpdateTransactionResponseDto> {
    return this.transactionService.update(id, updateTransactionDto);
  }

  /** Remove transaction */
  @ApiOperation({ summary: 'Remove transaction' })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.transactionService.remove(id);
  }
}
