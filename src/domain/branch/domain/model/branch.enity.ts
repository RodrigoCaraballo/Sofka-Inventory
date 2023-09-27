import { v4 as uuidv4 } from 'uuid';

import { IProduct } from '../../../../domain/product/domain';
import { IUser } from '../../../../domain/user/domain/interfaces';
import { UUIDValueObject } from '../../../commons/domain/value-objects';
import { IBranch } from '../interfaces';
import {
  BranchLocationValueObject,
  BranchNameValueObject,
} from '../value-object';

export class BranchEntity {
  branchId: UUIDValueObject;
  branchName: BranchNameValueObject;
  branchLocation: BranchLocationValueObject;
  branchProducts: IProduct[];
  branchEmployees: IUser[];

  constructor(data: IBranch) {
    if (data.branchId) this.branchId = new UUIDValueObject(data.branchId);
    else this.branchId = new UUIDValueObject(uuidv4());

    this.branchName = new BranchNameValueObject(data.branchName);
    this.branchLocation = new BranchLocationValueObject({
      country: data.branchCountry,
      city: data.branchCity,
    });
    this.branchProducts = this.branchProducts;
    this.branchEmployees = data.branchEmployees;
  }
}
