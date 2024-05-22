import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Customers } from './Schema/customers.schems';
import { Model} from 'mongoose';

@Injectable()
export class CustomersService {
constructor(@InjectModel(Customers.name) private customersModule: Model<Customers>){}

  findAll() {
    return this.customersModule.find();
  }


   findOne(id: string) {
      return this.customersModule.findById(id);
  }
}
