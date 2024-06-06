import { IsString, isString } from "class-validator";

export class ResponseAuth {
    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    token: string;

    @IsString()
    refreshToken: string;
}