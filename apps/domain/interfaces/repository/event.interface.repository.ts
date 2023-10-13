import { IEvent, RegisterBranchData, RegisterProductData } from '@Domain';
import { Observable } from 'rxjs';
import { AuthData } from '../event-data/auth.data';

export interface IEventRepository {
  saveEvent(event: IEvent): void;
  existBranch(branch: RegisterBranchData): Observable<IEvent>;
  existUser(email: string): Observable<IEvent>;
  existProduct(product: RegisterProductData): Observable<IEvent>;
  findProduct(branchId: string, productId: string): Observable<IEvent>;
  findProducts(branchId: string, productIds: string[]): Observable<IEvent[]>;

  countDocuments(): Observable<number>;

  authUser(auth: AuthData): Observable<IEvent>;
}
