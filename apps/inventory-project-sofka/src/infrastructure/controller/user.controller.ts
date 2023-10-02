import { RegisterUserUseCase } from '@CommandApplication';
import { Body, Controller, Post } from '@nestjs/common';

import { RegisterUserDTO } from '../dto/register-user.dto';

@Controller('api/v1/user')
export class CommandUserController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  @Post('register')
  registerUser(@Body() dto: RegisterUserDTO): void {
    this.registerUserUseCase.execute(dto);
  }
}
