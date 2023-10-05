import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  BranchTypeOrmEntity,
  ProductTypeOrmEntity,
  SaleTypeOrmEntity,
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
      host: process.env.MYSQL_DB_HOST,
      port: parseInt(process.env.MYSQL_DB_PORT),
      username: process.env.MYSQL_DB_USER,
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB_DATABASE,
      entities: [
        BranchTypeOrmEntity,
        UserTypeOrmEntity,
        ProductTypeOrmEntity,
        SaleTypeOrmEntity,
      ],
      synchronize: true,
    }),
    InfrastructureModule,
  ],
})
export class InventoryQueryModule {}
