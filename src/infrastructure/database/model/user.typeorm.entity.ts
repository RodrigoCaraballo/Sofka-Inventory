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
  userId: string;

  @Column('varchar')
  userName: string;

  @Column('varchar')
  userLastName: string;

  @Column('varchar')
  userPassword: string;

  @Column('varchar')
  userEmail: string;

  @Column('varchar')
  userRole: string;

  @OneToOne(
    (type) => BranchTypeOrmEntity,
    (entity: BranchTypeOrmEntity) => entity.branchEmployees,
  )
  @JoinColumn()
  userBranch?: BranchTypeOrmEntity;
}
