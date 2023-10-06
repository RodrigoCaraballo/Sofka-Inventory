import { IBranch, ISale } from '@Domain';
import { GetBranchUseCase, GetSalesUseCase } from '@QueryApplication';
import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';

@Controller('api/v1/branch')
export class ProductController {
  constructor(
    private readonly getBranchUseCase: GetBranchUseCase,
    private readonly getSalesUseCase: GetSalesUseCase,
  ) {}

  @Get('branch/:branchId')
  getBranch(@Param('branchId') branchId: string): Observable<IBranch> {
    return this.getBranchUseCase.execute(branchId);
  }

  @Get('sales/:branchId')
  getSales(@Param('branchId') branchId: string): Observable<ISale[]> {
    return this.getSalesUseCase.execute(branchId);
  }
}
