import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class UpdateUserDto{
     @IsOptional()
    userName?: string;
    
     @IsOptional()
    email?: string;

    @IsOptional()
    password?: string;
}