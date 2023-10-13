import { IUserRepository, RegisterUserData } from '@Domain';
import { BadRequestException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Observable, map } from 'rxjs';
import { AuthData } from '../../../domain/interfaces/event-data/auth.data';
import { AuthReponse } from '../../../domain/interfaces/response/token.response';

export class AuthUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  execute(data: AuthData): Observable<AuthReponse> {
    return this.userRepository.findUserByEmail(data.email).pipe(
      map((user: RegisterUserData) => {
        if (!user) throw new BadRequestException('Invalid user credentials');

        if (user.password !== data.password)
          throw new BadRequestException('Invalid user credentials');

        const token = jwt.sign(
          {
            userId: user.id,
            userEmail: user.email,
            userRole: user.role,
            branchId: user.branchId,
          },
          'secret',
          { expiresIn: 12 * 60 * 60 },
        );

        return { token };
      }),
    );
  }
}
