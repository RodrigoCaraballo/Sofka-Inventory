import { v4 as uuidv4 } from 'uuid';

import { IBranch, IProduct, IUser } from '../interfaces/model';
import {
  BranchLocationValueObject,
  BranchNameValueObject,
  UUIDValueObject,
} from '../value-object';

export class BranchEntity {
  id: UUIDValueObject;
  name: BranchNameValueObject;
  location: BranchLocationValueObject;
  products: IProduct[];
  employees: IUser[];

  constructor(data: IBranch) {
    if (data.id) this.id = new UUIDValueObject(data.id);
    else this.id = new UUIDValueObject(uuidv4());

    this.name = new BranchNameValueObject(data.name);
    this.location = new BranchLocationValueObject({
      country: data.country,
      city: data.city,
    });
    this.products = this.products;
    this.employees = data.employees;
  }
}
