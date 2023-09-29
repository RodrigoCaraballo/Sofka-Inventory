import { RegisterUserCommand } from '@Command';
import {
  IBranch,
  IBranchRepository,
  IUser,
  IUserRepository,
  RegisterUserData,
} from '@Interfaces';
import { UserEntity } from '@Model';
import { CommandBus } from '@nestjs/cqrs';
import { Observable, switchMap } from 'rxjs';

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly branchRepository: IBranchRepository,
    private readonly commandBus: CommandBus,
  ) {}

  execute(data: RegisterUserData): Observable<IUser> {
    const userBranch = this.getBranch(data.branchId);

    return userBranch.pipe(
      switchMap((branch: IBranch) => {
        const user = this.validateObject(data, branch);
        this.commandBus.execute(
          new RegisterUserCommand(data.branchId, JSON.stringify(user)),
        );
        return this.userRepository.saveUser(user);
      }),
    );
  }

  private getBranch(branchId: string): Observable<IBranch> {
    return this.branchRepository.findBranchById(branchId);
  }

  private validateObject(data: RegisterUserData, userBranch: IBranch): IUser {
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
