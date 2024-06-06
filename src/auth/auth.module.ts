import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { TokenModule } from 'src/token/token.module';
import { JwtStrategy } from 'src/starategy';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [UsersModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtService]
})
export class AuthModule {}
