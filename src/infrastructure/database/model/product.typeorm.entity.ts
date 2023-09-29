import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BranchTypeOrmEntity } from './branch.typeorm.entity';

@Entity('Product')
export class ProductTypeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  inventoryStock: number;

  @Column()
  category: string;

  @OneToOne(
    (type) => BranchTypeOrmEntity,
    (entity: BranchTypeOrmEntity) => entity.products,
  )
  @JoinColumn()
  branch: BranchTypeOrmEntity;
}
