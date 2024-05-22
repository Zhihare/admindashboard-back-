import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/Product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModule: Model<Product>){}
  create(createProductDto: CreateProductDto) {
    const newProduct = new this.productModule(createProductDto);
    return newProduct.save();
  }

  findAll() {
    return this.productModule.find();
  }

  findOne(name: string) {
      return this.productModule.find({ name: new RegExp(name, 'i') }).exec();
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productModule.findByIdAndUpdate(id, updateProductDto, {new: true});
  }

  remove(id: string) {
    return this.productModule.findByIdAndDelete(id);
  }
}
