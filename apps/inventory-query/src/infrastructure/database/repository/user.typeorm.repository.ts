import { IUser, IUserRepository } from '@Domain';
import { InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, catchError, from } from 'rxjs';
import { Repository } from 'typeorm';
import { UserTypeOrmEntity } from '../model';

export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserTypeOrmEntity)
    private readonly userRepository: Repository<UserTypeOrmEntity>,
  ) {}

  saveUser(user: IUser): Observable<IUser> {
    return from(this.userRepository.save(user)).pipe(
      catchError(() => {
        throw new InternalServerErrorException('Something went wrong');
      }),
    );
  }
  findUserById(id: string): Observable<IUser> {
    return from(this.userRepository.findOne({ where: { id } })).pipe(
      catchError(() => {
        throw new InternalServerErrorException('Something went wrong');
      }),
    );
  }
  findUserByEmail(email: string): Observable<IUser> {
    return from(this.userRepository.findOne({ where: { email } })).pipe(
      catchError(() => {
        throw new InternalServerErrorException('Something went wrong');
      }),
    );
  }
}
