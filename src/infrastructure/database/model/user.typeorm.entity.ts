import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BranchTypeOrmEntity } from './branch.typeorm.entity';

@Entity('User')
export class UserTypeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  lastName: string;

  @Column('varchar')
  password: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  role: string;

  @OneToOne(
    (type) => BranchTypeOrmEntity,
    (entity: BranchTypeOrmEntity) => entity.employees,
  )
  @JoinColumn()
  branch?: BranchTypeOrmEntity;
}
