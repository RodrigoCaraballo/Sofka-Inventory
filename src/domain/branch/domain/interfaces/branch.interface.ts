import { IProduct } from '../../../../domain/product/domain';
import { IUser } from '../../../../domain/user/domain/interfaces';

export interface IBranch {
  branchId?: string;
  branchName: string;
  branchCountry: string;
  branchCity: string;
  branchProducts: IProduct[];
  branchEmployees: IUser[];
}
