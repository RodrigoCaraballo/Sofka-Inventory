import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  BranchTypeOrmEntity,
  ProductTypeOrmEntity,
  UserTypeOrmEntity,
} from './infrastructure/database';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'rodri007',
      database: 'inventory',
      entities: [BranchTypeOrmEntity, UserTypeOrmEntity, ProductTypeOrmEntity],
      synchronize: true,
    }),
    InfrastructureModule,
  ],
})
export class InventoryQueryModule {}
