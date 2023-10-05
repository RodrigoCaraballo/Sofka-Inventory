import { Observable } from 'rxjs';
import { ISale } from '../model/sale.interface';

export interface ISaleRepository {
  saveSale(sale: ISale): Observable<ISale>;
}
