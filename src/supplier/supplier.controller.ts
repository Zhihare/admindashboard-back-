import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpException } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import mongoose from 'mongoose';

@Controller('suppliers')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) { }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.create(createSupplierDto);
  }

  @Get()
  findAll() {
    return this.supplierService.findAll();
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateSupplier(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
    const validId = mongoose.Types.ObjectId.isValid(id);
    if (!validId) throw new HttpException('Invalid ID', 400);
    const updateSuppler = await this.supplierService.updateUser(id, updateSupplierDto);
    if (!updateSuppler) throw new HttpException('User not found', 404);
    return updateSuppler;

  }
}
