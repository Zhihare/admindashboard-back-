import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UsersService } from './../users/users.service';
import { AppError } from 'src/common/const/errors';
import { AuthLoginDto } from './dto/auth.login.dto';
import * as bcrypt from 'bcrypt';
import { TokenService } from './../token/token.service';
import { ResponseAuth } from './respons';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly tokenService: TokenService,
        private readonly jwtService: JwtService,
    ) {}

async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
        const { password, ...result } = user.toObject();
        return result;
    }
    return null;
}

async loginUser(dto: AuthLoginDto): Promise<any> {
    const validatedUser = await this.validateUser(dto.email, dto.password);
    if (!validatedUser) {
      throw new HttpException(AppError.WRONG_DATA, HttpStatus.BAD_REQUEST);
    }

    const token = await this.tokenService.generateToken(dto.email);
    const refreshToken = await this.tokenService.generateRefreshToken(dto.email);
    await this.usersService.updateUserRefreshToken(dto.email, refreshToken, token);
    const user = await this.usersService.publicUser(dto.email)
    return {
      user,
    };
  }

    async refreshTokens(refreshToken: string): Promise<ResponseAuth> {
    const email = await this.tokenService.getEmailFromRefreshToken(refreshToken);
    if (!email) {
      throw new HttpException(AppError.INVALID_REFRESH_TOKEN, HttpStatus.UNAUTHORIZED);
    }

    const validatedUser = await this.usersService.findUserByEmail(email);
    if (!validatedUser) {
      throw new HttpException(AppError.USER_NOT_EXIST, HttpStatus.NOT_FOUND);
    }

    const newToken = await this.tokenService.generateToken(email);
        const newRefreshToken = await this.tokenService.generateRefreshToken(email);
        await this.usersService.updateUserRefreshToken(email, newRefreshToken, newToken);

    return {
      ...validatedUser,
      token: newToken,
      refreshToken: newRefreshToken,
    };
    }


       async logoutUser(email: string): Promise<any> {
        await this.usersService.clearRefreshToken(email);
        return { message: 'User logged out successfully' };
    }
}
