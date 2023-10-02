import { IBranch } from './branch.interface';

export interface IUser {
  id?: string;
  name: string;
  lastName: string;
  password: string;
  email: string;
  role: string;
  branch?: IBranch;
}
