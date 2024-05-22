import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Customers, CustomersSchema } from './Schema/customers.schems';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Customers.name,
        schema: CustomersSchema,
        collection: 'customers',
      },
    ]),
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [MongooseModule],
})
export class CustomersModule {}
