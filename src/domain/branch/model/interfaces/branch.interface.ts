import { UUIDValueObject } from '../../../../domain/commons/value-objects';
import { IProduct } from '../../../../domain/product/model';
import { IUser } from '../../../../domain/user/model/interfaces/user.interface';
import { BranchNameValueObject } from '../value-object';
import { BranchLocationValueObject } from '../value-object/branch-location.value-object';

export interface IBranch {
  branchId?: UUIDValueObject;
  branchName: BranchNameValueObject;
  branchLocation: BranchLocationValueObject;
  branchProducts: IProduct[];
  branchEmployees: IUser[];
}
