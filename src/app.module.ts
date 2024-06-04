import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';
import { SupplierModule } from './supplier/supplier.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { OrdersModule } from './orders/orders.module';
import { TokenModule } from './token/token.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
     MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongoUri'),
        dbName: configService.get<string>('mongoDbName'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    CustomersModule,
    ProductsModule,
    SupplierModule,
    DashboardModule,
    OrdersModule,
    TokenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
