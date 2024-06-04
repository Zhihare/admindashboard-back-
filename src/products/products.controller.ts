import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, HttpException, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import mongoose from 'mongoose';
import { JwtAuthGuard } from 'src/guards/jwt-quard';
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @UsePipes(new ValidationPipe())
    
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async find(@Query('name') name?: string) {
    if (name) {
      return this.productsService.findOne(name);
    } else {
      return this.productsService.findAll();
    }
  }



  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const validId = mongoose.Types.ObjectId.isValid(id);
    if (!validId) throw new HttpException('Invalid ID', 400);
    const updateProduct = await this.productsService.update(id, updateProductDto);
    if (!updateProduct) throw new HttpException('User not found', 404);
    return updateProduct;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const validId = mongoose.Types.ObjectId.isValid(id);
    if (!validId) throw new HttpException('Invalid ID', 400);
    const deleteProduct = await this.productsService.remove(id);
    if (!deleteProduct) throw new HttpException('User not found', 404);
    return new HttpException(`Product deleted`, 200);
  }
}
