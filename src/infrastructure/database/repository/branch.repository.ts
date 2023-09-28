import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Repository } from 'typeorm';
import { IBranch, IBranchRepository } from '../../../domain/interfaces';
import { BranchTypeOrmEntity } from '../model/branch.typeorm.entity';

export class BranchTypeOrmRepository implements IBranchRepository {
  constructor(
    @InjectRepository(BranchTypeOrmEntity)
    private readonly branchRepository: Repository<BranchTypeOrmEntity>,
  ) {}

  saveBranch(branch: IBranch): Observable<IBranch> {
    return from(this.branchRepository.save(branch));
  }
  findBranchById(branchId: string): Observable<IBranch> {
    return from(this.branchRepository.findOne({ where: { branchId } }));
  }
}
