import { Observable } from 'rxjs';
import { IUser, IUserRepository } from '../domain/interfaces';
import { UserEntity } from '../domain/model/user.entity';
import { RegisterUserDTO } from '../infrastructure/dto';

export class RegisterUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  execute(data: RegisterUserDTO): Observable<IUser> {
    const user = this.validateObject(data);

    return this.userRepository.saveUser(user);
  }

  private validateObject(data: RegisterUserDTO): IUser {
    const newUser = new UserEntity(data);

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
