import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ProductTypeOrmEntity } from '../../../domain/product/model/product.typeorm.entity';
import { UserTypeOrmEntity } from '../../../domain/user/model/user.typeorm.entity';

@Entity('Branch')
export class BranchTypeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  branchId: string;

  @Column('varchar')
  branchName: string;

  @Column('varchar')
  branchCountry: string;

  @Column('varchar')
  branchCity: string;

  @OneToMany(
    (type) => ProductTypeOrmEntity,
    (product: ProductTypeOrmEntity) => product.productBranch,
  )
  branchProducts: ProductTypeOrmEntity[];

  @OneToMany(
    (type) => UserTypeOrmEntity,
    (user: UserTypeOrmEntity) => user.userBranch,
  )
  branchEmployees: UserTypeOrmEntity[];
}
