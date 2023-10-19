import { IUser, IUserRepository, RegisterUserData } from '@Domain';
import { InternalServerErrorException } from '@nestjs/common';
import { Observable, catchError } from 'rxjs';

export class RegisterUserListenerUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  execute(data: RegisterUserData): Observable<IUser> {
    return this.userRepository.saveUser(data).pipe(
      catchError(() => {
        throw new InternalServerErrorException('Something went wrong');
      }),
    );
  }
}
