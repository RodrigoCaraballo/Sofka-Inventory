import { AuthUseCase } from '@CommandApplication';
import { Body, Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthReponse } from '../../../../domain/interfaces/response/token.response';
import { AuthDTO } from '../dto';
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authUseCase: AuthUseCase) {}

  @Post()
  auth(@Body() auth: AuthDTO): Observable<AuthReponse> {
    return this.authUseCase.execute(auth);
  }
}
