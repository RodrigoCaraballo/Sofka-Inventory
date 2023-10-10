import { Observable } from 'rxjs';
import { IBranch } from '../model/branch.interface';

export interface IBranchRepository<T = IBranch> {
  saveBranch(branch: T): Observable<T>;
  findBranchById(id: string): Observable<T>;
  findBranchByIdWithRelations(id: string): Observable<T>;
  findAllBranches(): Observable<T[]>;
}
