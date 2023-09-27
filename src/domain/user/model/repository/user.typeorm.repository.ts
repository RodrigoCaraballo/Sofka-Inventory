import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Repository } from 'typeorm';
import { IUserRepository } from '../interfaces/user.interface.repository';
import { UserTypeOrmEntity } from '../user.typeorm.entity';

export class UserTypeOrmRepository
  implements IUserRepository<UserTypeOrmEntity>
{
  constructor(
    @InjectRepository(UserTypeOrmEntity)
    private readonly userRepository: Repository<UserTypeOrmEntity>,
  ) {}

  saveUser(user: UserTypeOrmEntity): Observable<UserTypeOrmEntity> {
    return from(this.userRepository.save(user));
  }
  findUserById(userId: string): Observable<UserTypeOrmEntity> {
    return from(this.userRepository.findOne({ where: { userId } }));
  }
  findUserByEmail(userEmail: string): Observable<UserTypeOrmEntity> {
    return from(this.userRepository.findOne({ where: { userEmail } }));
  }
}
