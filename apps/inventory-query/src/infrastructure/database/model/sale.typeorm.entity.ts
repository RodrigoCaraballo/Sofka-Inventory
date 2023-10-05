import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BranchTypeOrmEntity } from './branch.typeorm.entity';

@Entity()
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
  productName: string;

  @Column()
  productPrice: number;

  @Column()
  quantity: number;
}
