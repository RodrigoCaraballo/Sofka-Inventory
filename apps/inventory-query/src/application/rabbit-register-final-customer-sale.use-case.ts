import { Observable, switchMap } from 'rxjs';

import {
  IBranch,
  IBranchRepository,
  ISale,
  ISaleRepository,
  RegisterSalesData,
} from '@Domain';

export class RabbitRegisterFinalCustomerSaleUseCase {
  constructor(
    private readonly branchRepository: IBranchRepository,
    private readonly saleRepository: ISaleRepository,
  ) {}

  execute(datas: RegisterSalesData[]): Observable<ISale[]> {
    return this.branchRepository.findBranchById(datas[0].branchId).pipe(
      switchMap((branch: IBranch) => {
        const newSales: ISale[] = datas.map((data) => ({
          id: data.id,
          branch: branch,
          invoiceNumber: data.invoiceNumber,
          type: 'FINAL CUSTOMER',
          productName: data.productName,
          productPrice: data.productPrice,
          quantity: data.quantity,
        }));
        return this.saveProducts(newSales);
      }),
    );
  }

  private saveProducts(sales: ISale[]): Observable<ISale[]> {
    return this.saleRepository.saveSales(sales);
  }
}
