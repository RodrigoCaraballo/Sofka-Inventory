import { RegisterBranchUseCase } from '@CommandApplication';
import { RegisterBranchDTO } from '@CommandInfrastructure';
import { CommandResponse } from '@Domain';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard } from '../guards/authorization.guard';
import { SuperAdminGuard } from '../guards/super-user.guard';

@UseGuards(AuthGuard)
@Controller('api/v1/branch')
export class CommandBranchController {
  constructor(private readonly registerBranchUseCase: RegisterBranchUseCase) {}

  @UseGuards(SuperAdminGuard)
  @Post('register')
  registerBranch(@Body() dto: RegisterBranchDTO): Observable<CommandResponse> {
    return this.registerBranchUseCase.execute(dto);
  }
}
