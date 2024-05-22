import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateSupplierDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    suppliers: string;

    @IsNotEmpty()
    date: Date;

    @IsNotEmpty()
    @IsString()
    amount: string;

    @IsNotEmpty()
    @IsString()
    status: string;
}
