import { IProduct } from './product.interface';
import { IUser } from './user.interface';

export interface IBranch {
  id?: string;
  name?: string;
  country?: string;
  city?: string;
  products?: IProduct[];
  employees?: IUser[];
}
