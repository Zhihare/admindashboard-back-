import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Product extends Document{

    @Prop({ required: false })
    photo?: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    suppliers: string;

    @Prop({ required: true })
    stock: string;

    @Prop({ required: true })
    price: string;

    @Prop({ required: true, default: 'Medicine' })
    category: string;
 
}

export const ProductSchema = SchemaFactory.createForClass(Product);