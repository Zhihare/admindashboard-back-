import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Order {
    @Prop({ required: true })
    photo: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    adress: string;

    @Prop({ required: true })
    products: string;

    @Prop({ required: true })
    price: string;

    @Prop({ required: true, enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled','Completed','Pending'], default: 'Pending' })
    status: string;

    @Prop({required: true })
    order_date: string;

 
}

export const OrderSchema = SchemaFactory.createForClass(Order);