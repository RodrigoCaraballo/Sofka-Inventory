import { IBranch } from '../../../../domain/branch/domain/interfaces';

export interface IProduct {
  productId?: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productInventoryStock: number;
  productCategory: string;
  productBranch: IBranch;
}
