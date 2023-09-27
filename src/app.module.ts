import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchModule } from './domain/branch/branch.module';
import { ProductModule } from './domain/product/product.module';
import { UserModule } from './domain/user/user.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb+srv://rodrigocaraballo:rodri007@cluster0.fzcprav.mongodb.net/inventory?retryWrites=true&w=majority',
    ),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'rodri007',
      database: 'inventory',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ProductModule,
    UserModule,
    BranchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
