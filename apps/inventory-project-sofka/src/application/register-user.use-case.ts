import {
  ICommandBus,
  RegisterUserCommand,
  RegisterUserData,
  UserEntity,
} from '@Domain';

export class RegisterUserUseCase {
  constructor(private readonly commandBus: ICommandBus) {}

  execute(data: RegisterUserData): void {
    this.validateEntity(data);
    this.emitCommand(data);
  }

  private emitCommand(data: RegisterUserData): void {
    this.commandBus.publish(
      new RegisterUserCommand(data.branchId, JSON.stringify(data)),
    );
  }

  private validateEntity(data: RegisterUserData): RegisterUserData {
    const newUser = new UserEntity(data);

    return {
      id: newUser.id.valueOf(),
      name: newUser.name.valueOf().userName,
      lastName: newUser.name.valueOf().userLastName,
      password: newUser.password.valueOf(),
      email: newUser.email.valueOf(),
      role: newUser.role.valueOf(),
      branchId: data.branchId,
    };
  }
}
