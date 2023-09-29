import { v4 as uuidv4 } from 'uuid';

import { IUser } from '../interfaces/model';
import { UserEmailValueObject } from '../value-object/user-email.value-object';
import { UserNameValueObject } from '../value-object/user-name.value-object';
import { UserPasswordValueObject } from '../value-object/user-password.value-objects';
import { UserRoleValueObject } from '../value-object/user.role.value-object';
import { UUIDValueObject } from '../value-object/uuid.value-object';

export class UserEntity {
  id: UUIDValueObject;
  name: UserNameValueObject;
  password: UserPasswordValueObject;
  email: UserEmailValueObject;
  role: UserRoleValueObject;

  constructor(data: IUser) {
    if (data.id) this.id = new UUIDValueObject(data.id);
    else this.id = new UUIDValueObject(uuidv4());

    this.name = new UserNameValueObject({
      userName: data.name,
      userLastName: data.name,
    });
    this.password = new UserPasswordValueObject(data.password);
    this.email = new UserEmailValueObject(data.email);
    this.role = new UserRoleValueObject(data.role);
  }
}
