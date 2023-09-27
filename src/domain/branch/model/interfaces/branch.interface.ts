import { IProduct } from '../../../../domain/product/domain';
import { IUser } from '../../../../domain/user/domain/interfaces';

export interface IBranch {
  branchId?: string;
  branchName: string;
  branchConutry: string;
  branchCity: string;
  branchProducts: IProduct[];
  branchEmployees: IUser[];
}
