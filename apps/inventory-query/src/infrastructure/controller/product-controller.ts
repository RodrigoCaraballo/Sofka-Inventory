import { IBranch, ISale } from '@Domain';
import {
  GetBranchUseCase,
  GetBranchesUseCase,
  GetSalesUseCase,
} from '@QueryApplication';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard } from '../guard/authorization.guard';

@UseGuards(AuthGuard)
@Controller('api/v1/branch')
export class ProductController {
  constructor(
    private readonly getBranchUseCase: GetBranchUseCase,
    private readonly getSalesUseCase: GetSalesUseCase,
    private readonly getBranchesUseCase: GetBranchesUseCase,
  ) {}

  @Get('branch/:branchId')
  getBranch(@Param('branchId') branchId: string): Observable<IBranch> {
    return this.getBranchUseCase.execute(branchId);
  }

  @Get('sales/:branchId')
  getSales(@Param('branchId') branchId: string): Observable<ISale[]> {
    return this.getSalesUseCase.execute(branchId);
  }

  @Get('branches')
  getBranches(): Observable<IBranch[]> {
    return this.getBranchesUseCase.execute();
  }
}
