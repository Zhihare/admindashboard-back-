import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class UpdateUserDto{
  
    @IsOptional()
    @IsEmail({}, { message: 'Invalid email' })
     
    email?: string;

    @IsOptional()
    password?: string;
}