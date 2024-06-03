import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { AuthLoginDto } from './dto/auth.login.dto';

@Controller('user')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    
    @Post('/register')
    register(@Body() userDto: CreateUserDto): Promise<CreateUserDto>{
        return this.authService.registerUser(userDto);
    }

     @Post('/login')
    login(@Body() userDto: AuthLoginDto): Promise<AuthLoginDto>{
        return this.authService.loginUser(userDto);
    }

}
