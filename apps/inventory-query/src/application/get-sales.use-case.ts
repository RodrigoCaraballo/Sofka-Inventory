import { ISale, ISaleRepository } from '@Domain';
import { Observable } from 'rxjs';

export class GetSalesUseCase {
  constructor(private readonly saleRepository: ISaleRepository) {}

  execute(branchId: string): Observable<ISale[]> {
    return this.saleRepository.findSales(branchId);
  }
}
