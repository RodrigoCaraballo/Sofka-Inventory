import { ISale, ISaleRepository } from '@Domain';
import { InternalServerErrorException } from '@nestjs/common';
import { Observable, catchError } from 'rxjs';

export class GetSalesUseCase {
  constructor(private readonly saleRepository: ISaleRepository) {}

  execute(branchId: string): Observable<ISale[]> {
    return this.saleRepository.findSales(branchId).pipe(
      catchError(() => {
        throw new InternalServerErrorException('Something went wrong');
      }),
    );
  }
}
