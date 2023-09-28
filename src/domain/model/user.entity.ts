import { v4 as uuidv4 } from 'uuid';

import { IUser } from '../interfaces/model';
import { UserEmailValueObject } from '../value-object/user-email.value-object';
import { UserNameValueObject } from '../value-object/user-name.value-object';
import { UserPasswordValueObject } from '../value-object/user-password.value-objects';
import { UserRoleValueObject } from '../value-object/user.role.value-object';
import { UUIDValueObject } from '../value-object/uuid.value-object';

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
