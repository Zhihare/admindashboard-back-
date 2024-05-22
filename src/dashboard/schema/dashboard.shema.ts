import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Operation {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    amount: string;

    @Prop({ required: true, enum: ['Expence', 'Error', 'Income']})
    type: string;

}

export const OperationSchema = SchemaFactory.createForClass(Operation);