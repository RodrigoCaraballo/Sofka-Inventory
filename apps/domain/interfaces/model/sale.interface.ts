import { IBranch } from './branch.interface';

export interface ISale {
  id?: string;
  branch?: IBranch;
  productName: string;
  productPrice: number;
  quantity: number;
}
