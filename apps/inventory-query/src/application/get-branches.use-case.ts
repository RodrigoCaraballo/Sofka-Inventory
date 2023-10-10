import { IBranch, IBranchRepository } from '@Domain';
import { Observable } from 'rxjs';

export class GetBranchesUseCase {
  constructor(private readonly branchRepository: IBranchRepository) {}

  execute(): Observable<IBranch[]> {
    return this.branchRepository.findAllBranches();
  }
}
