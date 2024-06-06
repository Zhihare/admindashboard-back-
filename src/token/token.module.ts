import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    JwtModule.register({}),
    ConfigModule,
    UsersModule,
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
