import { Body, Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RegisterBranchUseCase } from '../../application/register-branch.use-case';
import { IBranch } from '../../model/interfaces';
import { RegisterBranchDTO } from '../dto';

@Controller('branches')
export class BranchController {
  constructor(private readonly registerBranchUseCase: RegisterBranchUseCase) {}

  @Post()
  registerBranch(@Body() dto: RegisterBranchDTO): Observable<IBranch> {
    return this.registerBranchUseCase.execute(dto);
  }
}
