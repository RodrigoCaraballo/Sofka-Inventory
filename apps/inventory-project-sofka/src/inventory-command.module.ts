import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      'mongodb://rodri:rodri007@mongo-inventory:27017/inventory?authSource=admin',
    ),
    InfrastructureModule,
  ],
})
export class InventoryCommandModule {}
