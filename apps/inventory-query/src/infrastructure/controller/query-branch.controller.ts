import { IBranch, RegisterBranchData } from '@Domain';
import { RabbitRegisterBranchUseCase } from '@QueryApplication';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('api/v1/branch')
export class QueryBranchController {
  constructor(
    private readonly registerBranchUseCase: RabbitRegisterBranchUseCase,
  ) {}

  @EventPattern('BRANCH_REGISTERED')
  registerBranch(@Payload() dto: string): Observable<IBranch> {
    const branch: RegisterBranchData = JSON.parse(dto);

    return this.registerBranchUseCase.execute(branch);
  }
}
