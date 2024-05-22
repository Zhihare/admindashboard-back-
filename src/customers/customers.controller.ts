import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import mongoose from 'mongoose';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}


  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
    async getUsersById(@Param('id') id: string) {
        const validId = mongoose.Types.ObjectId.isValid(id);
        if (!validId) throw new HttpException('User not found', 404);
        const findUser = await this.customersService.findOne(id);
        if (!findUser) throw new HttpException('User not found', 404);
        return findUser;
    }
}
