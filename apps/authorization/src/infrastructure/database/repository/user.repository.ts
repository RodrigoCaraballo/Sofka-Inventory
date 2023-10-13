import { IUser, IUserMongooseInterface } from '@Domain';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable, from } from 'rxjs';
import { UserMongoose, UserMongooseDocument } from '../entity/user.document';

@Injectable()
export class UserMongooseRepository implements IUserMongooseInterface {
  constructor(
    @InjectModel(UserMongoose.name)
    private readonly userRepository: Model<UserMongooseDocument>,
  ) {}

  saveUser(user: IUser): Observable<IUser> {
    return from(this.userRepository.create(user));
  }
  findUserById(id: string): Observable<IUser> {
    return from(this.userRepository.findById(id));
  }
  findUserByEmail(email: string): Observable<IUser> {
    return from(this.userRepository.findOne({ email }));
  }

  countDocuments(): Observable<number> {
    return from(this.userRepository.countDocuments().exec());
  }
}
