import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Repository } from 'typeorm';
import {
  IUser,
  IUserRepository,
} from '../../../../../domain/user/domain/interfaces';
import { UserTypeOrmEntity } from '../model/user.typeorm.entity';

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
