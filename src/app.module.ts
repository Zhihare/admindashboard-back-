import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import { MongoosModuleModule } from './mongoos-module/mongoos-module.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
      MongooseModule.forRoot('mongodb+srv://one_user_one:pgnP9v_CJrxy%40BJ@cluster0.pnwidkg.mongodb.net/', {dbName: "dashboard"
    }),
    UsersModule,
    AuthModule,
    MongoosModuleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
