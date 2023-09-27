import { v4 as uuidv4 } from 'uuid';

import { UUIDValueObject } from '../../../domain/commons/value-objects';
import { IProduct } from '../../../domain/product/model';
import { IUser } from '../../../domain/user/model/interfaces';
import { IBranch } from './interfaces';
import {
  BranchLocationValueObject,
  BranchNameValueObject,
} from './value-object';

export class BranchEntity implements IBranch {
  branchId: UUIDValueObject;
  branchName: BranchNameValueObject;
  branchLocation: BranchLocationValueObject;
  branchProducts: IProduct[];
  branchEmployees: IUser[];

  constructor(data: IBranch) {
    if (data.branchId) this.branchId = data.branchId;
    else this.branchId = new UUIDValueObject(uuidv4());

    this.branchName = data.branchName;
    this.branchLocation = data.branchLocation;
    this.branchProducts = data.branchProducts;
    this.branchEmployees = data.branchEmployees;
  }
}
