import { v4 as uuidv4 } from 'uuid';
import { UUIDValueObject } from '../../../domain/commons/domain/value-objects';
import { IProduct } from '../../../domain/product/domain';
import { IUser } from '../../../domain/user/domain/interfaces';
import { IBranch } from '../domain/interfaces';
import {
  BranchLocationValueObject,
  BranchNameValueObject,
} from '../domain/value-object';

export class BranchEntity {
  branchId: UUIDValueObject;
  branchName: BranchNameValueObject;
  branchLocation: BranchLocationValueObject;
  branchProducts: IProduct[];
  branchEmployees: IUser[];

  constructor(data: IBranch) {
    if (data.branchId) new UUIDValueObject(data.branchId);
    else this.branchId = new UUIDValueObject(uuidv4());

    this.branchName = new BranchNameValueObject(data.branchName);
    this.branchLocation = new BranchLocationValueObject({
      country: data.branchCountry,
      city: data.branchCity,
    });
    this.branchProducts = data.branchProducts;
    this.branchEmployees = data.branchEmployees;
  }
}
