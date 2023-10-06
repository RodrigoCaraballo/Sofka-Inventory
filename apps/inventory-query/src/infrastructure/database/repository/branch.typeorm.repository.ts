import { IBranch, IBranchRepository } from '@Domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Repository } from 'typeorm';
import { BranchTypeOrmEntity } from '../model/branch.typeorm.entity';

export class BranchTypeOrmRepository implements IBranchRepository {
  constructor(
    @InjectRepository(BranchTypeOrmEntity)
    private readonly branchRepository: Repository<BranchTypeOrmEntity>,
  ) {}

  saveBranch(branch: IBranch): Observable<IBranch> {
    return from(this.branchRepository.save(branch));
  }
  findBranchById(id: string): Observable<IBranch> {
    return from(
      this.branchRepository.findOne({
        where: { id },
        // relations: ['products', 'employees'],
      }),
    );
  }

  findBranchByIdWithRelations(id: string): Observable<IBranch> {
    return from(
      this.branchRepository.findOne({
        where: { id },
        relations: ['products', 'employees'],
      }),
    );
  }
}
