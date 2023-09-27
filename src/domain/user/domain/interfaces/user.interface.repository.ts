import { Observable } from 'rxjs';
import { IUser } from './user.interface';

export interface IUserRepository<T = IUser> {
  saveUser(user: T): Observable<T>;
  findUserById(userId: string): Observable<T>;
  findUserByEmail(userEmail: string): Observable<T>;
}
