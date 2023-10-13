import { Observable } from 'rxjs';
import { IUserRepository } from './user.interface.repository';

export interface IUserMongooseInterface extends IUserRepository {
  countDocuments(): Observable<number>;
}
