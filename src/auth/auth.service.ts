import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UsersService } from './../users/users.service';
import { AppError } from 'src/common/const/errors';
import { AuthLoginDto } from './dto/auth.login.dto';
import * as bcrypt from 'bcrypt';
import { TokenService } from './../token/token.service';
import { ResponseAuth } from './respons';
@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly tokenService: TokenService,
    ) { }

    async registerUser(dto: CreateUserDto): Promise<CreateUserDto> {
        const existUser = await this.usersService.findUserByEmail(dto.email);
        if (existUser) throw new HttpException(AppError.USER_EXIST, HttpStatus.BAD_REQUEST);
        return this.usersService.createUser(dto)
    
    }
    
    async loginUser(dto: AuthLoginDto ): Promise<ResponseAuth> {
        const existUser = await this.usersService.findUserByEmail(dto.email);
        if (!existUser) throw new HttpException(AppError.USER_NOT_EXIST, HttpStatus.BAD_REQUEST);
        const validatePassword = await bcrypt.compare(dto.password, existUser.password);
        if (!validatePassword) throw new HttpException(AppError.WRONG_DATA, HttpStatus.BAD_REQUEST);
        const token = await this.tokenService.generateToken(dto.email);
        const user = await this.usersService.publicUser(dto.email);
        return {
            ...user,
            token,
        }

    }

}
