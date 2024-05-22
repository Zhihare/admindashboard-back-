import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Supplier } from './schema/supplier.schema';
import { Model} from 'mongoose';

@Injectable()
export class SupplierService {
  constructor(@InjectModel(Supplier.name) private supplierModule: Model<Supplier>){}
  create(createSupplierDto: CreateSupplierDto) {
    const newSupplier = new this.supplierModule(createSupplierDto);
    return newSupplier.save();
  }

  findAll() {
    return this.supplierModule.find();
  }

  updateUser(id: string, updateSupplierDto: UpdateSupplierDto) {
        return this.supplierModule.findByIdAndUpdate(id, updateSupplierDto, {new: true})
  }

}
