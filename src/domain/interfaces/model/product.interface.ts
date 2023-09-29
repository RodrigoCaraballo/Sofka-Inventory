import { IBranch } from './branch.interface';

export interface IProduct {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  inventoryStock?: number;
  category?: string;
  branch?: IBranch;
}
