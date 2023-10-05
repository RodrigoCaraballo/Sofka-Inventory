import { RegisterBranchUseCase } from '@CommandApplication';
import { RegisterBranchDTO } from '@CommandInfrastructure';
import { CommandResponse } from '@Domain';
import { Body, Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';

@Controller('api/v1/branch')
export class CommandBranchController {
  constructor(private readonly registerBranchUseCase: RegisterBranchUseCase) {}

  @Post('register')
  registerBranch(@Body() dto: RegisterBranchDTO): Observable<CommandResponse> {
    return this.registerBranchUseCase.execute(dto);
  }
}
