import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schema/Order.schema';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private ordersModule: Model<Order>) { }

  findAll() {
    return this.ordersModule.find();
  }

  findOne(name: string) {
      return this.ordersModule.find({ name: new RegExp(name, 'i') }).exec();
  }

}
