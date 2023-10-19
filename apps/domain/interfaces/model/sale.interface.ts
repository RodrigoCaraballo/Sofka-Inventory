import { IBranch } from './branch.interface';

export interface ISale {
  id?: string;
  branch?: IBranch;
  invoiceNumber: string;
  type?: string;
  productName: string;
  productPrice: number;
  quantity: number;
  activated?: boolean;
}
