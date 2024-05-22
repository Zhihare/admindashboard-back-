import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }


 @Get()
  async find(@Query('name') name?: string) {
   if (name) {
      return this.ordersService.findOne(name);
   } else {
      return this.ordersService.findAll();
    }
  }
}
 
