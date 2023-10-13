import { IUser, IUserRepository } from '@Domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Repository } from 'typeorm';
import { UserTypeOrmEntity } from '../model';

export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserTypeOrmEntity)
    private readonly userRepository: Repository<UserTypeOrmEntity>,
  ) {}
  countDocuments(): Observable<number> {
    throw new Error('Method not implemented.');
  }

  saveUser(user: IUser): Observable<IUser> {
    return from(this.userRepository.save(user));
  }
  findUserById(id: string): Observable<IUser> {
    return from(this.userRepository.findOne({ where: { id } }));
  }
  findUserByEmail(email: string): Observable<IUser> {
    return from(this.userRepository.findOne({ where: { email } }));
  }
}
