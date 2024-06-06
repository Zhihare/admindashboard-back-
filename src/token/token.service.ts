import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly usersService: UsersService
    ) { }

   async generateToken(email: string) {
    const payload = { email };
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('secretJwt'),
      expiresIn: this.configService.get<string>('expireJwt'),
    });
  }

   async generateRefreshToken(email: string) {
    const payload = { email };
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('secretJwt'),
      expiresIn: this.configService.get<string>('expireRefreshJwt'),
    });
  }

  async getEmailFromRefreshToken(refreshToken: string): Promise<string | null> {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('secretJwt'),
      });
      return decoded.email;
    } catch (error) {
      return null;
    }
    }
    
    
}