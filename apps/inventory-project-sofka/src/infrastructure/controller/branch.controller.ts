import { RegisterBranchUseCase } from '@CommandApplication';
import { RegisterBranchDTO } from '@CommandInfrastructure';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('api/v1/branch')
export class CommandBranchController {
  constructor(private readonly registerBranchUseCase: RegisterBranchUseCase) {}

  @Post('register')
  registerBranch(@Body() dto: RegisterBranchDTO): void {
    this.registerBranchUseCase.execute(dto);
  }
}
