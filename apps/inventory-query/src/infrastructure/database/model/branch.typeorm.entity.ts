import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductTypeOrmEntity } from './product.typeorm.entity';
import { SaleTypeOrmEntity } from './sale.typeorm.entity';
import { UserTypeOrmEntity } from './user.typeorm.entity';

@Entity('Branch')
export class BranchTypeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  country: string;

  @Column('varchar')
  city: string;

  @OneToMany(
    (type) => ProductTypeOrmEntity,
    (product: ProductTypeOrmEntity) => product.branch,
  )
  products: ProductTypeOrmEntity[];

  @OneToMany(
    (type) => UserTypeOrmEntity,
    (user: UserTypeOrmEntity) => user.branch,
  )
  employees: UserTypeOrmEntity[];

  @OneToMany(
    (type) => SaleTypeOrmEntity,
    (sale: SaleTypeOrmEntity) => sale.branch,
  )
  sales: SaleTypeOrmEntity[];
}
