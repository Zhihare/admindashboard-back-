import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class CreateUserDto{
 
    @IsNotEmpty()
     @IsEmail({}, { message: 'Invalid email' })
     @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    
}