import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class UpdateUserDto{
  
     @IsOptional()
    email?: string;

    @IsOptional()
    password?: string;
}