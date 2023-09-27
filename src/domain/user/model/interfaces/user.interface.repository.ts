import { Observable } from 'rxjs';

export interface IUserRepository<T> {
  saveUser(user: T): Observable<T>;
  findUserById(userId: string): Observable<T>;
  findUserByEmail(userEmail: string): Observable<T>;
}
