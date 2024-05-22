import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsOptional()
    @IsString()
    photo?: string;
    
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    suppliers?: string;

    @IsOptional()
    @IsString()
    stock?: string;

    @IsOptional()
    @IsString()
    price?: string;

    @IsOptional()
    @IsString()
    category?: string;




}
