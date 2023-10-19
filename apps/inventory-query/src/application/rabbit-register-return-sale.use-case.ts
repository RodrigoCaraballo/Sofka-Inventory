import { ISale, ISaleRepository, RegisterReturnSaleData } from '@Domain';
import { Observable, switchMap } from 'rxjs';

export class RabbitRegisterReturnSaleUseCase {
  constructor(private readonly saleRepository: ISaleRepository) {}

  execute(data: RegisterReturnSaleData): Observable<ISale> {
    const dbProduct = this.saleRepository.findSaleByInvoiceNumberAndProductId(
      data.invoiceNumber,
      data.saleId,
    );
    return dbProduct.pipe(
      switchMap((sale: ISale) => {
        const newSale = {
          ...sale,
          activated: false,
        };
        return this.saveSale(newSale);
      }),
    );
  }

  private saveSale(sale: ISale): Observable<ISale> {
    return this.saleRepository.saveSale(sale);
  }
}
