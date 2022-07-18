import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Jwt auth guard
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
