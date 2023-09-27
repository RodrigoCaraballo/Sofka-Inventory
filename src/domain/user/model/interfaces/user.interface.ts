import { UUIDValueObject } from '../../../../domain/commons/value-objects';
import {
  UserEmailValueObject,
  UserNameValueObject,
  UserPasswordValueObject,
  UserRoleValueObject,
} from '../value-object';

export interface IUser {
  userId?: UUIDValueObject;
  userName: UserNameValueObject;
  userPassword: UserPasswordValueObject;
  userEmail: UserEmailValueObject;
  userRole: UserRoleValueObject;
}
