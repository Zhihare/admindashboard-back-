import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsOptional()
    @IsString()
    photo?: string;
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    suppliers: string;

    @IsNotEmpty()
    @IsString()
    stock: string;

    @IsNotEmpty()
    @IsString()
    price: string;

    @IsNotEmpty()
    @IsString()
    category: string;


}
