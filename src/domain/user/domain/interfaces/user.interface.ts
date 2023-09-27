import { IBranch } from '../../../../domain/branch/domain/interfaces';

export interface IUser {
  userId?: string;
  userName: string;
  userLastName: string;
  userPassword: string;
  userEmail: string;
  userRole: string;
  userBranch?: IBranch;
}
