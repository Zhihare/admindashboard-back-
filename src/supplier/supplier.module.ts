import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Supplier, SupplierSchema } from './schema/supplier.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Supplier.name,
        schema: SupplierSchema,
        collection: 'suppliers',
      },
    ]),
  ],
  controllers: [SupplierController],
  providers: [SupplierService],
  exports: [MongooseModule],
})
export class SupplierModule {}
