import { IBranch } from './branch.interface';

export interface IUser {
  userId?: string;
  userName: string;
  userLastName: string;
  userPassword: string;
  userEmail: string;
  userRole: string;
  userBranch?: IBranch;
}
