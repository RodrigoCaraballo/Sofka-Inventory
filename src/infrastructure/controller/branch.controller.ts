import { RegisterBranchUseCase } from '@Application';
import { IBranch } from '@Interfaces';
import { Body, Controller, Post } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable } from 'rxjs';
import { RegisterBranchDTO } from '../dto/register-branch.dto';

@Controller('api/v1/branch')
export class BranchController {
  constructor(
    private readonly registerBranchUseCase: RegisterBranchUseCase,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Post('register')
  registerBranch(@Body() dto: RegisterBranchDTO): Observable<IBranch> {
    return this.registerBranchUseCase.execute(dto);
  }
}
