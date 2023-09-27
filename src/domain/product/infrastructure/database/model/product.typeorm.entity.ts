import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BranchTypeOrmEntity } from '../../../../../domain/branch/model/branch.typeorm.entity';

@Entity('Product')
export class ProductTypeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  productId: string;

  @Column()
  productName: string;

  @Column()
  productDescription: string;

  @Column()
  productPrice: number;

  @Column()
  productInventoryStock: number;

  @Column()
  productCategory: string;

  @OneToOne(
    (type) => BranchTypeOrmEntity,
    (entity: BranchTypeOrmEntity) => entity.branchProducts,
  )
  @JoinColumn()
  productBranch: BranchTypeOrmEntity;
}
