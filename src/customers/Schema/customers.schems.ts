import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class Customers extends Document {
    @Prop({required: true })
    image: string;

    @Prop({required: true })
    name: string;

    @Prop({unique: true, required: true })
    email: string;

    @Prop({required: true })
    spent: string;

    @Prop({required: true})
    phone: string;

    @Prop({required: true })
    address: string;

    @Prop({ required: true })
    register_date: string;

 
}

export const CustomersSchema = SchemaFactory.createForClass(Customers);