import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }
    async generateToken(user) {
        const payload = { user };
        return this.jwtService.sign(payload, {
            secret: this.configService.get('secretJwt'),
            expiresIn: this.configService.get('expireJwt')

        } )

        }

}
