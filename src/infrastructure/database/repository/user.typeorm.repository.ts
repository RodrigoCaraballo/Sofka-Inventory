import { IUser, IUserRepository } from '@Interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Repository } from 'typeorm';
import { UserTypeOrmEntity } from '../model';

export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserTypeOrmEntity)
    private readonly userRepository: Repository<UserTypeOrmEntity>,
  ) {}

  saveUser(user: IUser): Observable<IUser> {
    return from(this.userRepository.save(user));
  }
  findUserById(userId: string): Observable<IUser> {
    return from(this.userRepository.findOne({ where: { userId } }));
  }
  findUserByEmail(userEmail: string): Observable<IUser> {
    return from(this.userRepository.findOne({ where: { userEmail } }));
  }
}
