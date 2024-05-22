import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierDto } from './create-supplier.dto';
import { IsOptional } from 'class-validator';

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {

    @IsOptional()
    name?: string;

     @IsOptional()
    address?: string;

     @IsOptional()
    suppliers?: string;

     @IsOptional()
    date?: Date;

     @IsOptional()
    amount?: string;

     @IsOptional()
    status?: string;


}
