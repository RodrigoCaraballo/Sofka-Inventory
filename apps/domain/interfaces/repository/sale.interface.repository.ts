import { Observable } from 'rxjs';
import { ISale } from '../model/sale.interface';

export interface ISaleRepository {
  saveSales(sales: ISale[]): Observable<ISale[]>;
  findSales(branchId: string): Observable<ISale[]>;
  findSaleByInvoiceNumberAndProductId(
    invoiceNumber: string,
    id: string,
  ): Observable<ISale>;
  saveSale(sale: ISale): Observable<ISale>;
}
