import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  ValueObjectErrorHandler,
  ValueObjectException,
} from '../../../lib/sofka';
import { RegisterUserDTO } from '../infrastructure/dto';
import { IUser, IUserRepository } from '../model/interfaces';
import { UserTypeOrmRepository } from '../model/repository/user.typeorm.repository';
import { UserEntity } from '../model/user.entity';
import { UserTypeOrmEntity } from '../model/user.typeorm.entity';
import {
  UserEmailValueObject,
  UserNameValueObject,
  UserPasswordValueObject,
  UserRoleValueObject,
} from '../model/value-object';

@Injectable()
export class RegisterUserUseCase extends ValueObjectErrorHandler {
  constructor(
    @Inject(UserTypeOrmRepository)
    private readonly userRepository: IUserRepository<UserTypeOrmEntity>,
  ) {
    super();
  }

  execute(data: RegisterUserDTO): Observable<IUser> {
    const user = this.createValueObject(data);
    const newUser: UserTypeOrmEntity = {
      userId: user.userId.valueOf(),
      userName: user.userName.valueOf().userName,
      userLastName: user.userName.valueOf().userLastName,
      userPassword: user.userPassword.valueOf(),
      userEmail: user.userEmail.valueOf(),
      userRole: user.userRole.valueOf(),
    };

    return this.userRepository.saveUser(
      newUser,
    ) as unknown as Observable<IUser>;
  }

  createValueObject(data: RegisterUserDTO): IUser {
    const { userName, userLastName, userPassword, userEmail, userRole } = data;
    const userNameVO = new UserNameValueObject({ userName, userLastName });
    const userPasswordVO = new UserPasswordValueObject(userPassword);
    const userEmailVO = new UserEmailValueObject(userEmail);
    const userRoleVO = new UserRoleValueObject(userRole);

    const newUser = new UserEntity({
      userName: userNameVO,
      userPassword: userPasswordVO,
      userEmail: userEmailVO,
      userRole: userRoleVO,
    });

    this.validateValueObject(newUser);

    return newUser;
  }

  validateValueObject(valueObject: IUser): void {
    const { userName, userPassword, userEmail, userRole } = valueObject;

    if (userName instanceof UserNameValueObject && userName.hasErrors())
      this.setErrors(userName.getErrors());
    if (
      userPassword instanceof UserPasswordValueObject &&
      userPassword.hasErrors()
    )
      this.setErrors(userPassword.getErrors());
    if (userEmail instanceof UserEmailValueObject && userEmail.hasErrors())
      this.setErrors(userEmail.getErrors());
    if (userRole instanceof UserRoleValueObject && userRole.hasErrors())
      this.setErrors(userRole.getErrors());

    if (this.hasErrors()) {
      throw new ValueObjectException(
        'RegisterUserUseCase Has Errors',
        this.getErrors(),
      );
    }
  }
}
