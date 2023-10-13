import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @Column('decimal', { precision: 6, scale: 2 })
  price: number;

  @Column()
  inventoryStock: number;

  @Column()
  category: string;

  @ManyToOne(
    (type) => BranchTypeOrmEntity,
    (entity: BranchTypeOrmEntity) => entity.products,
  )
  @JoinColumn()
  branch: BranchTypeOrmEntity;
}
