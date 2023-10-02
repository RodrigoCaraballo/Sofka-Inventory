import { RegisterUserCommand } from '@Command';
import {
  IBranch,
  IBranchRepository,
  ICommandBus,
  IUser,
  IUserRepository,
  RegisterUserData,
} from '@Interfaces';
import { UserEntity } from '@Model';
import { Observable, switchMap } from 'rxjs';

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly branchRepository: IBranchRepository,
    private readonly commandBus: ICommandBus,
  ) {}

  execute(data: RegisterUserData): Observable<IUser> {
    const userBranch = this.getBranch(data.branchId);

    return userBranch.pipe(
      switchMap((branch: IBranch) => {
        const user = this.validateEntity(data, branch);
        this.emitCommand(data.branchId, user);
        return this.userRepository.saveUser(user);
      }),
    );
  }

  private getBranch(branchId: string): Observable<IBranch> {
    return this.branchRepository.findBranchById(branchId);
  }

  private emitCommand(branchId: string, user: IUser): void {
    this.commandBus.publish(
      new RegisterUserCommand(branchId, JSON.stringify(user)),
    );
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
