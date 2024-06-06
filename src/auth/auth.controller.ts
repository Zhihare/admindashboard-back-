import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth.login.dto';
import { ResponseAuth } from './respons';

@Controller('user')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

     @Post('/login')
    login(@Body() userDto: AuthLoginDto): Promise<AuthLoginDto>{
         return this.authService.loginUser(userDto);
    }

      @Post('/refresh')
  async refreshTokens(@Body('refreshToken') refreshToken: string): Promise<ResponseAuth> {
    return await this.authService.refreshTokens(refreshToken);
    }
    
     @Post('/logout')
    async logoutUser(@Req() req): Promise<any> {
        const email = req.body.email;
        return this.authService.logoutUser(email);
    }

}
