import { Observable, tap } from 'rxjs';
import { RegisterEventUseCase } from 'src/domain/commons/application/register-event.use-case';
import { IUser, IUserRepository } from '../domain/interfaces';
import { UserEntity } from '../domain/model/user.entity';
import { RegisterUserDTO } from '../infrastructure/dto';

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly registerEventUseCase: RegisterEventUseCase<IUser>,
  ) {}

  execute(data: RegisterUserDTO): Observable<IUser> {
    const user = this.validateObject(data);

    return this.userRepository.saveUser(user).pipe(
      tap((user: IUser) => {
        this.registerEventUseCase.execute({
          eventType: 'REGISTERED_USER',
          eventData: user,
        });
      }),
    );
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
