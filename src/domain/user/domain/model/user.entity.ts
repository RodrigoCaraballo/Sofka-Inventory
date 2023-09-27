import { v4 as uuidv4 } from 'uuid';

import { UUIDValueObject } from '../../../commons/domain/value-objects';
import { IUser } from '../interfaces';
import {
  UserEmailValueObject,
  UserNameValueObject,
  UserPasswordValueObject,
  UserRoleValueObject,
} from '../value-object';

export class UserEntity {
  userId: UUIDValueObject;
  userName: UserNameValueObject;
  userPassword: UserPasswordValueObject;
  userEmail: UserEmailValueObject;
  userRole: UserRoleValueObject;

  constructor(data: IUser) {
    if (data.userId) this.userId = new UUIDValueObject(data.userId);
    else this.userId = new UUIDValueObject(uuidv4());

    this.userName = new UserNameValueObject({
      userName: data.userName,
      userLastName: data.userLastName,
    });
    this.userPassword = new UserPasswordValueObject(data.userPassword);
    this.userEmail = new UserEmailValueObject(data.userEmail);
    this.userRole = new UserRoleValueObject(data.userRole);
  }
}
