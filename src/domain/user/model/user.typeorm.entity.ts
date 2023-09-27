import { BranchTypeOrmEntity } from 'src/domain/branch/model/branch.typeorm.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
