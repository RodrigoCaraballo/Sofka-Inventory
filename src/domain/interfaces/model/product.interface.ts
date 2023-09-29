import { IBranch } from './branch.interface';

export interface IProduct {
  productId?: string;
  productName?: string;
  productDescription?: string;
  productPrice?: number;
  productInventoryStock?: number;
  productCategory?: string;
  productBranch?: IBranch;
}