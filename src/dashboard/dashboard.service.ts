import { Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Customers } from 'src/customers/Schema/customers.schems';
import { Model } from 'mongoose';
import { Product } from 'src/products/schema/Product.schema';
import { Supplier } from 'src/supplier/schema/supplier.schema';
import { Operation } from './schema/dashboard.shema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Customers.name) private customerModel: Model<Customers>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Supplier.name) private supplierModel: Model<Supplier>,
    @InjectModel(Operation.name) private operation: Model<Operation>,
  ) { }
 

  async count() {
    const countCustomers = await this.customerModel.countDocuments().exec();
    const countProducts = await this.productModel.countDocuments().exec();
    const countSuppliers = await this.supplierModel.countDocuments().exec();
    const operations = await this.operation.find();
    const lastCustomers = await this.customerModel
      .find()
      .sort({ _id: -1 })
      .limit(5) 
      .exec();
    
    return {
      countCustomers,
      countProducts,
      countSuppliers,
      operations,
      lastCustomers,
    }
  }

}
