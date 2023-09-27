import { Body, Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RegisterUserUseCase } from '../../application/register-user.use-case';
import { IUser } from '../../model/interfaces';
import { RegisterUserDTO } from '../dto';

@Controller('users')
export class UserController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  @Post()
  registerUser(@Body() dto: RegisterUserDTO): Observable<IUser> {
    return this.registerUserUseCase.execute(dto);
  }
}
