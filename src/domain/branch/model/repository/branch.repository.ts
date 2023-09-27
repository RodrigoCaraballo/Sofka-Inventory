import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Repository } from 'typeorm';
import { BranchTypeOrmEntity } from '../branch.typeorm.entity';
import { IBranchRepository } from '../interfaces';

export class BranchTypeOrmRepository
  implements IBranchRepository<BranchTypeOrmEntity>
{
  constructor(
    @InjectRepository(BranchTypeOrmEntity)
    private readonly branchRepository: Repository<BranchTypeOrmEntity>,
  ) {}

  saveBranch(branch: BranchTypeOrmEntity): Observable<BranchTypeOrmEntity> {
    return from(this.branchRepository.save(branch));
  }
  findBranchById(branchId: string): Observable<BranchTypeOrmEntity> {
    return from(this.branchRepository.findOne({ where: { branchId } }));
  }
}
