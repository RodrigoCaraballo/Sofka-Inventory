import {
  IEvent,
  RegisterBranchData,
  RegisterProductData,
  RegisterUserData,
} from '@Domain';
import { Observable } from 'rxjs';

export interface IEventRepository {
  saveEvent(event: IEvent): void;
  existBranch(branch: RegisterBranchData): Observable<IEvent>;
  existUser(user: RegisterUserData): Observable<IEvent>;
  existProduct(product: RegisterProductData): Observable<IEvent>;
  findProduct(branchId: string, productId: string): Observable<IEvent>;
}
