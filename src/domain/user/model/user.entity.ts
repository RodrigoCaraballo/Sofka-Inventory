import { v4 as uuidv4 } from 'uuid';

import { UUIDValueObject } from '../../../domain/commons/value-objects';
import { IUser } from './interfaces';
import {
  UserEmailValueObject,
  UserNameValueObject,
  UserPasswordValueObject,
  UserRoleValueObject,
} from './value-object';

export class UserEntity implements IUser {
  userId: UUIDValueObject;
  userName: UserNameValueObject;
  userPassword: UserPasswordValueObject;
  userEmail: UserEmailValueObject;
  userRole: UserRoleValueObject;

  constructor(data: IUser) {
    if (data.userId) this.userId = data.userId;
    else this.userId = new UUIDValueObject(uuidv4());

    this.userName = data.userName;
    this.userPassword = data.userPassword;
    this.userEmail = data.userEmail;
    this.userRole = data.userRole;
  }
}
