import { IUser, IUserRepository, RegisterUserData } from '@Domain';
import { Observable } from 'rxjs';

export class RegisterUserListenerUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  execute(data: RegisterUserData): Observable<IUser> {
    return this.userRepository.saveUser(data);
  }
}
