import { RegisterUserUseCase } from '@CommandApplication';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { CommandResponse } from '@Domain';
import { Observable } from 'rxjs';
import { RegisterUserDTO } from '../dto/register-user.dto';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/authorization.guard';

@UseGuards(AuthGuard)
@Controller('api/v1/user')
export class CommandUserController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  @UseGuards(AdminGuard)
  @Post('register')
  registerUser(@Body() dto: RegisterUserDTO): Observable<CommandResponse> {
    return this.registerUserUseCase.execute(dto);
  }
}
