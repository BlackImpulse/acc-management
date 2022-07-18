import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConfig } from '../../common/configs/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PersonModule } from '../person/person.module';

/** Auth module */
@Global()
@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([]),
    JwtModule.registerAsync(jwtConfig),
    ConfigModule,
    PersonModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
