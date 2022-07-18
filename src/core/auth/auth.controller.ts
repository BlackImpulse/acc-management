import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';

/** Auth controller */
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /** Login person */
  @ApiOperation({ summary: 'Login person' })
  @ApiResponse({ status: HttpStatus.CREATED, type: LoginResponseDto })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(
    @Body() loginUserDto: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    return await this.authService.login(loginUserDto);
  }
}
