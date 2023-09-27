import { Observable } from 'rxjs';

export interface IBranchRepository<T> {
  saveBranch(branch: T): Observable<T>;
  findBranchById(branchId: string): Observable<T>;
}
