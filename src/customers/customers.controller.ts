import { Controller, Get, Param, HttpException, UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';

import mongoose from 'mongoose';
import { JwtAuthGuard } from 'src/guards/jwt-quard';

@UseGuards(JwtAuthGuard)
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
