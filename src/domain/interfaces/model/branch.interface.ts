import { IProduct } from './product.interface';
import { IUser } from './user.interface';

export interface IBranch {
  branchId?: string;
  branchName?: string;
  branchCountry?: string;
  branchCity?: string;
  branchProducts?: IProduct[];
  branchEmployees?: IUser[];
}
