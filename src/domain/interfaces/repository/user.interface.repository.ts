import { Observable } from 'rxjs';
import { IUser } from '../model';

export interface IUserRepository<T = IUser> {
  saveUser(user: T): Observable<T>;
  findUserById(userId: string): Observable<T>;
  findUserByEmail(userEmail: string): Observable<T>;
}
