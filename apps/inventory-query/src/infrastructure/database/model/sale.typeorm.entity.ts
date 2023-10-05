import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BranchTypeOrmEntity } from './branch.typeorm.entity';

@Entity('Sale')
export class SaleTypeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    (type) => BranchTypeOrmEntity,
    (branch: BranchTypeOrmEntity) => branch.sales,
  )
  @JoinColumn()
  branch: BranchTypeOrmEntity;

  @Column()
  invoiceNumber: string;

  @Column()
  type: string;

  @Column()
  productName: string;

  @Column()
  productPrice: number;

  @Column()
  quantity: number;
}
