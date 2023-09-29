import { RegisterBranchUseCase } from '@Application';
import { IBranch } from '@Interfaces';
import { Body, Controller, Post } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable } from 'rxjs';
import { RegisterBranchDTO } from '../dto/register-branch.dto';

@Controller('branches')
export class BranchController {
  constructor(
    private readonly registerBranchUseCase: RegisterBranchUseCase,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Post()
  registerBranch(@Body() dto: RegisterBranchDTO): Observable<IBranch> {
    return this.registerBranchUseCase.execute(dto);
  }
}
