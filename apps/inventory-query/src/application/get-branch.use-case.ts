import { IBranch, IBranchRepository } from '@Domain';
import { Observable } from 'rxjs';

export class GetBranchUseCase {
  constructor(private readonly branchRepository: IBranchRepository) {}

  execute(branchId: string): Observable<IBranch> {
    return this.branchRepository.findBranchByIdWithRelations(branchId);
  }
}
