// src/users/schema/User.schema.ts

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
    @Prop({ required: true })
    password: string;

    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: false })
    name: string;

    @Prop({ required: false })
    token?: string;

    @Prop({ required: true, default: "" })
    refreshToken: string;

    @Prop({ required: false, default: "admin" })
    role?: string;
}

export const UsersSchema = SchemaFactory.createForClass(User);
