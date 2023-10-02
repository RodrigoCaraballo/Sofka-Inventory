import { RegisterBranchData } from '@Domain';
import { RabbitRegisterBranchUseCase } from '@QueryApplication';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('api/v1/branch')
export class QueryBranchController {
  constructor(
    private readonly registerBranchUseCase: RabbitRegisterBranchUseCase,
  ) {}

  @EventPattern('BRANCH_REGISTERED')
  registerBranch(@Payload() dto: string): void {
    const branch: RegisterBranchData = JSON.parse(dto);

    this.registerBranchUseCase.execute(branch);
  }
}
