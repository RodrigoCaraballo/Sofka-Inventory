import { Observable } from 'rxjs';
import { IBranch } from './branch.interface';

export interface IBranchRepository<T = IBranch> {
  saveBranch(branch: T): Observable<T>;
  findBranchById(branchId: string): Observable<T>;
}
