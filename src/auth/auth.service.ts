import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { User } from 'src/users/schema/User.schema';
import { UsersService } from './../users/users.service';
import { AppError } from 'src/common/const/errors';
@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private usersService: UsersService) { }

    async registerUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
         const existUser = await this.usersService.findUserByEmail(createUserDto.email);
        if (existUser) throw new HttpException(AppError.USER_EXIST, HttpStatus.BAD_REQUEST);   
        return this.usersService.createUser(createUserDto);
    
}

}
