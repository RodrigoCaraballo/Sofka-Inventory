import { RegisterUserUseCase } from '@CommandApplication';
import { Body, Controller, Post } from '@nestjs/common';

import { CommandResponse } from '@Domain';
import { Observable } from 'rxjs';
import { RegisterUserDTO } from '../dto/register-user.dto';

@Controller('api/v1/user')
export class CommandUserController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  @Post('register')
  registerUser(@Body() dto: RegisterUserDTO): Observable<CommandResponse> {
    return this.registerUserUseCase.execute(dto);
  }
}
