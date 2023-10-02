import {
  IBranch,
  IBranchRepository,
  IUser,
  IUserRepository,
  RegisterUserData,
  UserEntity,
} from '@Domain';
import { Observable, switchMap } from 'rxjs';

export class RabbitRegisterUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly branchRepository: IBranchRepository,
  ) {}

  execute(data: RegisterUserData): Observable<IUser> {
    const userBranch = this.getBranch(data.branchId);

    return userBranch.pipe(
      switchMap((branch: IBranch) => {
        const user = this.validateEntity(data, branch);
        return this.userRepository.saveUser(user);
      }),
    );
  }

  private getBranch(branchId: string): Observable<IBranch> {
    return this.branchRepository.findBranchById(branchId);
  }

  private validateEntity(data: RegisterUserData, userBranch: IBranch): IUser {
    const newUser = new UserEntity(data);

    return {
      id: newUser.id.valueOf(),
      name: newUser.name.valueOf().userName,
      lastName: newUser.name.valueOf().userLastName,
      password: newUser.password.valueOf(),
      email: newUser.email.valueOf(),
      role: newUser.role.valueOf(),
      branch: userBranch,
    };
  }
}
