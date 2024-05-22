import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Operation, OperationSchema } from './schema/dashboard.shema';
import { CustomersModule } from 'src/customers/customers.module';
import { SupplierModule } from 'src/supplier/supplier.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    CustomersModule,
    SupplierModule,
    ProductsModule,
    MongooseModule.forFeature([
      {
        name: Operation.name,
        schema: OperationSchema,
        collection: 'Income-Expenses',
      },
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
