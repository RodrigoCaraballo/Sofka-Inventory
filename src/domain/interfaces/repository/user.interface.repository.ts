import { Observable } from 'rxjs';
import { IUser } from '../model';

export interface IUserRepository<T = IUser> {
  saveUser(user: T): Observable<T>;
  findUserById(id: string): Observable<T>;
  findUserByEmail(email: string): Observable<T>;
}
