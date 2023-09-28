import { Observable } from 'rxjs';
import { RegisterUserCommand } from '../domain/command/register-user.command';
import { IUser, IUserRepository } from '../domain/interfaces';
import { UserEntity } from '../domain/model/user.entity';

export class RegisterUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  execute(data: RegisterUserCommand): Observable<IUser> {
    const user = this.validateObject(data);

    return this.userRepository.saveUser(user);
  }

  private validateObject(data: RegisterUserCommand): IUser {
    const newUser = new UserEntity(data.eventData);

    return {
      userId: newUser.userId.valueOf(),
      userName: newUser.userName.valueOf().userName,
      userLastName: newUser.userName.valueOf().userLastName,
      userPassword: newUser.userPassword.valueOf(),
      userEmail: newUser.userEmail.valueOf(),
      userRole: newUser.userRole.valueOf(),
    };
  }
}
