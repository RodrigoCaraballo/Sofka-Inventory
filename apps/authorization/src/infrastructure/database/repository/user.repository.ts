import { IUser, IUserMongooseInterface } from '@Domain';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable, catchError, from } from 'rxjs';
import { UserMongoose, UserMongooseDocument } from '../entity/user.document';

@Injectable()
export class UserMongooseRepository implements IUserMongooseInterface {
  constructor(
    @InjectModel(UserMongoose.name)
    private readonly userRepository: Model<UserMongooseDocument>,
  ) {}

  saveUser(user: IUser): Observable<IUser> {
    return from(this.userRepository.create(user)).pipe(
      catchError(() => {
        throw new InternalServerErrorException('Something went wrong');
      }),
    );
  }

  findUserById(id: string): Observable<IUser> {
    return from(this.userRepository.findById(id)).pipe(
      catchError(() => {
        throw new InternalServerErrorException('Something went wrong');
      }),
    );
  }

  findUserByEmail(email: string): Observable<IUser> {
    return from(this.userRepository.findOne({ email })).pipe(
      catchError(() => {
        throw new InternalServerErrorException('Something went wrong');
      }),
    );
  }

  countDocuments(): Observable<number> {
    return from(this.userRepository.countDocuments().exec()).pipe(
      catchError(() => {
        throw new InternalServerErrorException('Something went wrong');
      }),
    );
  }
}
