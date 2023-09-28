import { Body, Controller, Post } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable, tap } from 'rxjs';
import { RegisterBranchUseCase } from '../../application/register-branch.use-case';
import { IBranch } from '../../domain/interfaces';
import { RegisterBranchDTO } from '../dto';

@Controller('branches')
export class BranchController {
  constructor(
    private readonly registerBranchUseCase: RegisterBranchUseCase,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Post()
  registerBranch(@Body() dto: RegisterBranchDTO): Observable<IBranch> {
    return this.registerBranchUseCase.execute(dto).pipe(
      tap((branch: IBranch) =>
        this.eventEmitter.emit('register-event', {
          eventType: 'BRANCH_REGISTERED',
          eventData: JSON.stringify({
            branchId: branch.branchId,
            branchName: branch.branchName,
            branchCountry: branch.branchCountry,
            branchCity: branch.branchCity,
          }),
        }),
      ),
    );
  }
}
