import { BranchTypeOrmEntity } from 'src/domain/branch/infrastructure/database/model/branch.typeorm.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
