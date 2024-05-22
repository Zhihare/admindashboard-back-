import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";



@Schema()
export class Supplier extends Document {
    @Prop({required: true })
    name: string;

    @Prop({required: true })
    address: string;

    @Prop({required: true })
    suppliers: string;

    @Prop({required: true })
    date: Date;

    @Prop({required: true})
    amount: string;

    @Prop({required: true, default: "active" })
    status: string;

 
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);