import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/guards/jwt-quard';

@UseGuards(JwtAuthGuard)
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
 
